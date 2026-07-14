const mongoose = require("mongoose")
const Supplier = require('../models/Supplier')
const { logBusinessAction } = require('../utils/auditLogger')

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find()
    res.status(200).json(suppliers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSupplierById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid supplier id' })
  try {
    const supplier = await Supplier.findById(id)
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' })
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addSupplier = async (req, res) => {
  const currentUser = req.user
  try {
    // 1. Destructure the data, including the nested address object
    const { name, email, address } = req.body;

    // 2. Defensive Validation: Ensure address exists and has its required fields
    if (!name || !email || !address || !address.city || !address.region) {
      return res.status(400).json({ 
        message: 'Missing required fields. Name, email, city, and region are required.' 
      });
    }

    // 3. Optional: Check if a supplier with this name already exists (since unique: true)
    const supplierExists = await Supplier.findOne({ name });
    if (supplierExists) {
      return res.status(400).json({ message: 'A supplier with this name already exists.' });
    }

    // 4. Save to MongoDB
    const newSupplier = await Supplier.create({
      name,
      email,
      address: {
        street: address.street,
        city: address.city,
        region: address.region
      }
    });

    await logBusinessAction({
      userId: currentUser.id,
      userEmail: currentUser?.email,
      action: 'SUPPLIER_CREATED',
      targetId: newSupplier._id,
      targetModel: 'Supplier',
      details: {  name: newSupplier.name },
                  
      req 
      })

    res.status(201).json({ message: 'Supplier registered successfully', supplier: newSupplier });

  } catch (error) {
    console.error('Error saving supplier:', error);
    res.status(400).json({ message: 'Database saving failed', error: error.message });
  }
}

const updateSupplier = async (req, res) => {
  const currentUser = req.user
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid supplier id' })
  const { name, contact, address } = req.body
  if (!name || !contact || !address) return res.status(400).json({ message: 'All fields are required' })
  try {
    const supplier = await Supplier.findByIdAndUpdate(id, { name, contact, address }, { new: true })
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' })

  await logBusinessAction({
    userId: currentUser.id,
    userEmail: currentUser?.email,
    action: 'SUPPLIER_UPDATED',
    targetId: id,
    targetModel: 'Supplier',
    details: {  name: supplier.name},
                
    req 
    })
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteSupplier = async (req, res) => {
  const currentUser = req.user
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid supplier id' })
  try {
    const supplier = await Supplier.findByIdAndDelete(id)
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' })
    await logBusinessAction({
      userId: currentUser.id,
      userEmail: currentUser?.email,
      action: 'SUPPLIER_DELETED',
      targetId: id,
      targetModel: 'Supplier',
      details: {  name: supplier.name },
                  
      req 
      })
    res.status(200).json({ message: 'Supplier deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplier
}