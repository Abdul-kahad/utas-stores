const Request = require('../models/Request')
const Item = require('../models/Item')

const sendRequest = async (req, res) => {
  const userId = req.user.id
  const {itemId, quantity} = req.body
  if(!userId || !itemId || !quantity) return res.status(400).json({message: 'bad request'})
  try {
    const newRequest = {
      user: userId,
      items: [{item: itemId, quantity}],
      status: 'pending'
    }
    await Request.create(newRequest)
    res.status(200).json({message: 'request sent'})
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const directIssueItem = async (req, res) => {
    const adminId = req.user.id; 
    const { recipientId, item, quantityIssued } = req.body;

    try {
        if (!recipientId || !item || !quantityIssued) {
            return res.status(400).json({ message: 'Please provide recipient, item, and quantity.' });
        }

        const quantity = Number(quantityIssued);
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than zero.' });
        }

        const findItem = await Item.findById(item);
        if (!findItem) return res.status(404).json({ message: 'Item not found.' });

        if (Number(findItem.quantity || 0) < quantity) {
            return res.status(400).json({ 
                message: `Insufficient stock. Only ${findItem.quantity || 0} units left.` 
            });
        }

        const issueRecord = await Request.create({
            user: recipientId,             
            items: [{
                item: findItem._id,
                quantity: quantity 
            }],
            quantityRequested: quantity, 
            quantityIssued: quantity,   
            status: 'issued',             
            approvedBy: adminId,            
            issuedAt: new Date()
        });

        const newTotalQuantity = Number(findItem.quantity) - quantity;
        await Item.findByIdAndUpdate(findItem._id, { quantity: newTotalQuantity });

        res.status(201).json({ 
            message: 'Item issued and logged successfully', 
            record: issueRecord 
        });

    } catch (error) {
        console.error('Error executing direct allocation entry:', error);
        res.status(500).json({ message: 'Internal server error processing distribution ledger.' });
    }
};

const userRequests = async (req, res) => {
  const userId = req.user.id
  try {
    const requests = await Request.find({user: userId}).populate('user', 'name').populate('items.item', 'name category unit')
    // console.log(requests)
    if(!requests) return res.status(404).json({message: 'No requests are currently available'})
    res.status(200).json(requests)
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const getRequest = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'name').populate('items.item', 'name category unit').populate('approvedBy', 'name')
    // console.log(requests)
    if(!requests) return res.status(404).json({message: 'No requests are currently available'})
    res.status(200).json(requests)
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const approveRequest = async (req, res) => {
  const userId = req.user.id
  const requestId = req.params.id
  if(!requestId) return res.status(400).json({message: 'request id is required'})
  try {
    const request = await Request.findById(requestId)
    if(!request) return res.status(404).json({message: 'requests not available'})
    const item = await Item.findById(request.items[0].item)
    
    if(item.quantity <= request.items[0].quantity){
      return res.status(400).json({message: 'insurficient items'})
    }else{
      const updateItemQuantity = {
        quantity: item.quantity - request.items[0].quantity
      }
      // console.log(item.quantity)
      // console.log(request.items[0].quantity)
      // console.log(updateItemQuantity)
      const updatedItem = await Item.findByIdAndUpdate(request.items[0].item, updateItemQuantity,{ new: true })

      if(updatedItem){
      const approved = await Request.findByIdAndUpdate(requestId, {status: 'approved', approvedBy: userId})
      console.log(approved)
    }
    }
    res.status(200).json({message: 'Request approved'})
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const rejectRequest = async (req, res) => {
  const userId = req.user.id
  const requestId = req.params.id
  if(!requestId) return res.status(400).json({message: 'request id is required'})
  try {
    const request = await Request.findById(requestId)
    if(!request) return res.status(404).json({message: 'requests not available'})
    const rejected = await Request.findByIdAndUpdate(requestId, {status: 'rejected', approvedBy: userId})
    res.status(200).json({message: 'Request rejected'})
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const fulfillRequest = async (req, res) => {
  const userId = req.user.id
  const requestId = req.params.id
  let updateItemquantity
  if(!requestId) return res.status(400).json({message: 'request id is required'})
  try {
    const request = await Request.findById(requestId)
    if(!request) return res.status(404).json({message: 'requests not available'})
    const items = request.items
    for (const item of items) {
      const dbItem = await Item.findById(item.item)
      if (!dbItem || dbItem.quantity < item.quantity) {
      return res.status(400).json({ 
        message: `Not enough stock for ${dbItem ? dbItem.name : 'Unknown Item'}` 
      })}
    }
    for(const item of items){
      const dbitem = await Item.findById(item.item)
      const quantity = dbitem.quantity
      if(quantity < item.quantity) 
      updateItemquantity = await Item.findByIdAndUpdate(item.item, {quantity: quantity - item.quantity})
    }
    const fulfilled = await Request.findByIdAndUpdate(requestId, {status: 'fulfilled', approvedBy: userId})
    res.status(200).json({message: 'Request fulfilled'})
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

module.exports = {
  sendRequest,
  userRequests,
  getRequest,
  approveRequest,
  rejectRequest,
  fulfillRequest,
  directIssueItem
}