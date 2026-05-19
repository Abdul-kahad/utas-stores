const Item = require('../models/Item')

const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    if(!items) return res.status(404).json({message: 'no items available'})
    res.status(200).json(items)
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const getItem = async (req, res) => {
  const itemId = req.params.id
  try {
    const item = await Item.findById(itemId)
    if(!item) return res.status(404).json({message: 'item not available'})
    res.status(200).json(item)
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const addItem = async (req, res) => {
  const {name, category, quantity, unit, supplier} = req.body
  console.log('Received data:', req.body)
  if ( !name || !category || !quantity || !unit || !supplier ) return res.status(401).json({message: 'please enter all fields'})
  try {
    const item = await Item.create({name, category, quantity, unit, supplier})
    res.status(201).json({ message: 'item added successfully', item})
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const updateItem = async (req, res) => {
  const itemId = req.params.id
  const {name, category, quantity, unit} = req.body
  try {
    const item = await Item.findById(itemId)
    if(!item) return res.status(404).json({message: 'item not found'})
    const updatedItem = {
      name: name || item.name, 
      category: category || item.category, 
      quantity: quantity || item.quantity, 
      unit: unit || item.unit,
      reorderLevel: req.body.reorderLevel !== undefined ? req.body.reorderLevel : item.reorderLevel,
      supplier: req.body.supplier !== undefined ? req.body.supplier : item.supplier,
    }
    await Item.findByIdAndUpdate(item._id, updatedItem)
    res.status(201).json({ message: 'item updated successfully', updatedItem})
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

const deleteItem = async (req, res) => {
  const itemId = req.params.id
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId)
    res.status(200).json({message: 'item deleted successfully'})
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({message: 'Internal or server error'})
  }
}

module.exports = {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
}