import Axios from 'axios'

export const getItems = async() => {
  try {
    const response =  await Axios.get('http://localhost:5000/api/items', {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Fail to get items an error occured')
    return error.response?.data?.message
  }
}

export const getItem = async(itemId) => {
  try {
    const response =  await Axios.get(`http://localhost:5000/api/items/${itemId}`, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Fail to get item an error occured')
    return error.response?.data?.message
  }
}

export const addItem = async(formData) => {
  console.log('Adding item with data:', formData)
  try {
    const response = await Axios.post('http://localhost:5000/api/items', formData, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to add item an error occured', error)
    return error.response?.data?.message
  }
}

export const updateItem = async(itemId, formData) => {
  console.log('Updating item with ID:', itemId, 'and data:', formData)
  try {
    const response = await Axios.put(`http://localhost:5000/api/items/${itemId}`, formData, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to update an error occured', error)
    return error.response?.data?.message
  }
}

export const deleteItem = async(itemId) => {
  try {
    const response =  await Axios.delete(`http://localhost:5000/api/items/${itemId}`, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to delete an error occured')
    return error.response?.data?.message
  }
}