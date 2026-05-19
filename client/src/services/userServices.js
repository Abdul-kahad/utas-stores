import Axios from "axios"

export const getAllUsers = async () => {
  try {
    const results = await Axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return results.data
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

export const getUserById = async (id) => {
  try {
    const results = await Axios.get(`http://localhost:5000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return results.data
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error)
  }
}

export const updateUser = async (id, userData) => {
  try {
    const results = await Axios.put(`http://localhost:5000/api/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return results.data
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error)
  }
}

export const deleteUser = async (id) => {
  try {
    const results = await Axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return results.data
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error)
  }
}