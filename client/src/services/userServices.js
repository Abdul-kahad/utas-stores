import API from "../api/api"

export const getAllUsers = async () => {
  try {
    const results = await API.get("/users")
    return results.data
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

export const getUserById = async (id) => {
  try {
    const results = await API.get(`/users/${id}`)
    return results.data
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error)
  }
}

export const updateUser = async (id, userData) => {
  try {
    const results = await API.put(`/users/${id}`, userData)
    return results.data
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error)
  }
}

export const deleteUser = async (id) => {
  try {
    const results = await API.delete(`/users/${id}`)
    return results.data
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error)
  }
}