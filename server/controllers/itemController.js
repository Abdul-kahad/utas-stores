const Item = require('../models/Item')
const { logBusinessAction } = require('../utils/auditLogger')

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
  const currentUser = req.user;
  const { name, category, reorderLevel, unit } = req.body;
  if (!name || !category || !reorderLevel || !unit) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const savedItem = await Item.create({ name, category, unit, reorderLevel });
    await logBusinessAction({
      userId: currentUser.id,
      userEmail: currentUser?.email,
      action: 'ITEM_CREATED',
      targetId: savedItem._id,
      targetModel: 'Item',
      details: { name: savedItem.name, category: savedItem.category },
      req 
    })
    res.status(201).json({ message: 'Item added successfully', savedItem });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal or server error' });
  }
};

const deleteItem = async (req, res) => {
  const currentUser = req.user;
  const itemId = req.params.id
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId)
    await logBusinessAction({
      userId: currentUser.id,
      userEmail: currentUser?.email,
      action: 'ITEM_DELETED',
      targetId: deletedItem._id,
      targetModel: 'Item',
      details: { name: deletedItem.name, category: deletedItem.category },
      req 
    })
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
  deleteItem
}