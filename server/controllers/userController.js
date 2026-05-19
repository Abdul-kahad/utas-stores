const mongoose =  require('mongoose');
const User = require('../models/User')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({message: 'Users retrieved successfully', users})
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const getUserById = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: 'Invalid user id'})
  try {
    const user = await User.findById(id).select('-password')
    if(!user) return res.status(404).json({message: 'User not found'})
    res.status(200).json({message: 'User retrieved successfully', user})
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const updateUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: 'Invalid user id'})
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true}).select('-password')
    if(!user) return res.status(404).json({message: 'User not found'})
    res.status(200).json({message: 'User updated successfully', user})
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const deleteUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: 'Invalid user id'})
  try {
    const user = await User.findByIdAndDelete(id)
    if(!user) return res.status(404).json({message: 'User not found'})
    res.status(200).json({message: 'User deleted successfully'})
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}