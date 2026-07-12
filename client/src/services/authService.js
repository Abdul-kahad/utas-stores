import API from "../api/api"

export const register = async(formData) => {
  try {
    const response = await API.post('/auth/register', formData)
    return response.data.message
  } catch (error) {
    console.log('Fail to register an error occured')
    console.log(error.response?.data?.message)
    return error.response?.data?.message
  }
}

export const userlogin = async(formData) => {
  try {
    const response = await API.post('/auth/login', formData)
    return response.data
  } catch (error) {
    console.log('Fail to login an error occured')
    console.log(error.response?.data?.message)
    return error.response?.data?.message
  }
}

export const refresh = async() => {
  try {
    const response = await API.post('/auth/refresh')
     return response.data
  } catch (error) {
    console.log('Fail to refresh an error occured')
    console.log(error.response?.data?.message)
    return error.response?.data?.message
  }
}

export const logout = async() => {
  try {
    const response = await API.post('/auth/logout')
     return response.data
  } catch (error) {
    console.log('Fail to logout an error occured')
    console.log(error.response?.data?.message)
   return error.response?.data?.message
  }
}
