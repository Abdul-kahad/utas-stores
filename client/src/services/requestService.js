import Axios from 'axios'

export const userRequests = async() => {
  try {
    const response =  await Axios.get('http://localhost:5000/api/requests/user', {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Fail to get user requests an error occured')
    return error.response?.data?.message
  }
}

export const getRequests = async() => {
  try {
    const response = await Axios.get('http://localhost:5000/api/requests', {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
   return response.data
  } catch (error) {
    console.log(`Fail to get requests an error occured`)
    return error.response?.data?.message
  }
}

export const sendRequests = async(formData) => {
  try {
    console.log('Sending request with data:', formData)
    const response =  await Axios.post(`http://localhost:5000/api/requests`, formData, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to send item an error occured')
    return error.response?.data?.message
  }
}

export const approveRequest = async(itemId) => {
  try {
    const response = await Axios.put(`http://localhost:5000/api/requests/${itemId}/approve`, {}, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to approve an error occured')
    console.log(error)
    return error.response?.data?.message
  }
}

export const rejectRequest = async(itemId) => {
  try {
    const response =  await Axios.put(`http://localhost:5000/api/requests/${itemId}/reject`, {}, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to reject an error occured')
    return error.response?.data?.message
  }
}

export const fulfillRequest = async(itemId) => {
  try {
    const response =  await Axios.put(`http://localhost:5000/api/requests/${itemId}/fulfill`, {}, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data.message
  } catch (error) {
    console.log('Fail to fulfill an error occured')
    return error.response?.data?.message
  }
}

