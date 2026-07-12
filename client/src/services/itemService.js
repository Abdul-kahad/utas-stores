import API from "../api/api"

export const getItems = async() => {
  try {
    const response =  await API.get('/items')
    return response.data
  } catch (error) {
    console.log('Fail to get items an error occured')
    return error.response?.data?.message
  }
}

export const getItem = async(itemId) => {
  try {
    const response =  await API.get(`/items/${itemId}`)
    return response.data
  } catch (error) {
    console.log('Fail to get item an error occured')
    return error.response?.data?.message
  }
}

export const addItem = async (formData) => {
  console.log('Adding item with data:', formData);
  const token = localStorage.getItem('accessToken'); // Ensure this matches what you used in Login.js

  try {
    const response = await API.post('/items', formData);
    return response.data.message;
  } catch (error) {
    console.error('Fail to add item an error occured', error);
    // Throw the error so the UI catch block can see it
    throw error;
  }
}

export const deleteItem = async(itemId) => {
  try {
    const response =  await API.delete(`/items/${itemId}`)
    return response.data.message
  } catch (error) {
    console.log('Fail to delete an error occured')
    return error.response?.data?.message
  }
}