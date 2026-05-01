const Request = require('../models/Request')
const Item = require('../models/Item')

const sendRequest = async (req, res) => {
  const userId = req.user.id
  const {items} = req.body
  if(!userId || !items) return res.status(400).json({message: 'bad request'})
  try {
    const newRequest = {
      user: userId,
      items: items,
      status: 'pending',
    }
    await Request.create(newRequest)
    res.status(200).json({message: 'request sent'})
  } catch (error) {
    console.log('Request error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const getRequest = async (req, res) => {
  try {
    const requests = await Request.find()
    if(requests.length === 0) return res.status(404).json({message: 'No requests are currently available'})
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
    const approved = await Request.findByIdAndUpdate(requestId, {status: 'approved', approvedBy: userId})
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
      const updateItemquantity = await Item.findByIdAndUpdate(item.item, {quantity: quantity - item.quantity})
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
  getRequest,
  approveRequest,
  rejectRequest,
  fulfillRequest
}