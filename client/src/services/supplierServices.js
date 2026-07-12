import API from "../api/api"

export const getSuppliers = async () => {
  try {
    const response = await API.get('/suppliers')
    return response.data
  } catch (error) {
    console.error('Error fetching suppliers:', error)
  }
}

export const getSupplierById = async (id) => {
  try {
    const response = await API.get(`/suppliers/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching supplier:', error)
  }
}

export const addSupplier = async (supplierData) => {
  try {
    const response = await API.post("/suppliers", supplierData);
    return response.data;
  } catch (error) {
    console.error('Error adding supplier:', error)
  }
};

export const updateSupplier = async (id, supplierData) => {  
  try {
    const response = await API.put(`/suppliers/${id}`, supplierData,)
    return response.data
  } catch (error) {
    console.error('Error updating supplier:', error)
  }
}

export const deleteSupplier = async (id) => {
  try {
    const response = await API.delete(`/suppliers/${id}`,)
    return response.data
  } catch (error) {
    console.error('Error deleting supplier:', error)
  }
}
