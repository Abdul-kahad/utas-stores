import Axios from "axios"

export const getSuppliers = async () => {
  try {
    const response = await Axios.get('http://localhost:5000/api/suppliers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching suppliers:', error)
  }
}

export const getSupplierById = async (id) => {
  try {
    const response = await Axios.get(`http://localhost:5000/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching supplier:', error)
  }
}

export const addSupplier = async (supplierData) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
  }

  const response = await Axios.post("http://localhost:5000/api/suppliers", supplierData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const updateSupplier = async (id, supplierData) => {  
  try {
    const response = await Axios.put(`http://localhost:5000/api/suppliers/${id}`, supplierData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating supplier:', error)
  }
}

export const deleteSupplier = async (id) => {
  try {
    const response = await Axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting supplier:', error)
  }
}
