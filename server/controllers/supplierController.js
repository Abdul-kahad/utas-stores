const mongoose = require("mongoose")
const Supplier = require('../models/Supplier')

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

const createSupplier = async (req, res) => {
  const { name, contact, address } = req.body
  if (!name || !contact || !address) return res.status(400).json({ message: 'All fields are required' })
  try {
    const supplier = await Supplier.create({ name, contact, address })
    res.status(201).json(supplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateSupplier = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid supplier id' })
  const { name, contact, address } = req.body
  if (!name || !contact || !address) return res.status(400).json({ message: 'All fields are required' })
  try {
    const supplier = await Supplier.findByIdAndUpdate(id, { name, contact, address }, { new: true })
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' })
    res.status(200).json(supplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteSupplier = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid supplier id' })
  try {
    const supplier = await Supplier.findByIdAndDelete(id)
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' })
    res.status(200).json({ message: 'Supplier deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
}