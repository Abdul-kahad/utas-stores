const Receipt = require("../models/Receipt")
const Item = require("../models/Item")

const generateReceipt = async(req, res) => {
    const userId = req.user.id
    const {supplier, item, quantityReceived, category,unit} = req.body
    try {
    if ( !supplier || !item || !quantityReceived || !category || !unit ) return res.status(401).json({message: 'please enter all fields'})

        const findItem = await Item.findById(item)
        if(!findItem) return res.status(404).json({message: 'Cannot find item'})
        const receipt = await Receipt.create({supplier: supplier, item: findItem._id, quantityReceived: quantityReceived, receivedBy: userId, category: category,unit: unit})
        const newTotalQuantity = Number(findItem.quantity || 0) + Number(quantityReceived);
        const updatedItem = await Item.findByIdAndUpdate(findItem._id, {quantity: newTotalQuantity, unit:unit},{ new: true })
        if(!updatedItem) res.status(400).json({message: 'Error updateding item'})
        res.status(201).json({ message: 'item added successfully', receipt})
    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({message: 'Internal or server error'})
    }
}

const getReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find()
            .populate('item', 'name category unit')
            .populate('receivedBy', 'name')
            .populate('supplier', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(receipts);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal or server error' });
    }
}

module.exports = {
    generateReceipt,
    getReceipts
}