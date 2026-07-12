import API from "../api/api"

export const userRequests = async() => {
  try {
    const response =  await API.get('/requests/user',)
    return response.data
  } catch (error) {
    console.log('Fail to get user requests an error occured')
    return error.response?.data?.message
  }
}

export const submitDirectIssue = async (formData) => {
  try {
    const response = await API.post('/requests/direct-issue', formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Direct issue submission failure:', error);
    throw error.response?.data?.message || 'Server error tracking manual distribution.';
  }
};

export const getRequests = async() => {
  try {
    const response = await API.get('/requests',)
   return response.data
  } catch (error) {
    console.log(`Fail to get requests an error occured`)
    return error.response?.data?.message
  }
}

export const sendRequests = async(formData) => {
  try {
    console.log('Sending request with data:', formData)
    const response =  await API.post(`/requests`, formData,)
    return response.data.message
  } catch (error) {
    console.log('Fail to send item an error occured')
    return error.response?.data?.message
  }
}

export const approveRequest = async(itemId) => {
  try {
    const response = await API.put(`/requests/${itemId}/approve`, {},)
    return response.data.message
  } catch (error) {
    console.log('Fail to approve an error occured')
    console.log(error)
    return error.response?.data?.message
  }
}

export const rejectRequest = async(itemId) => {
  try {
    const response =  await API.put(`/requests/${itemId}/reject`, {},)
    return response.data.message
  } catch (error) {
    console.log('Fail to reject an error occured')
    return error.response?.data?.message
  }
}

export const fulfillRequest = async(itemId) => {
  try {
    const response =  await API.put(`/requests/${itemId}/fulfill`, {},)
    return response.data.message
  } catch (error) {
    console.log('Fail to fulfill an error occured')
    return error.response?.data?.message
  }
}
