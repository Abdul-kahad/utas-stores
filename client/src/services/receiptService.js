import Axios from 'axios'

// 1. GET: Fetch all historical restock receipts
export const getRestockReceipts = async () => {
  try {
    const response = await Axios.get('http://localhost:5000/api/receipts', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    // Return the array of receipts from your backend
    return response.data
  } catch (error) {
    console.error('Failed to fetch restock receipts:', error)
    // Return an empty array so your frontend .map() calls don't break
    return []
  }
}

// 2. POST: Create a new restock receipt record
export const generateReceipt = async(formData) => {
  try {
    const response = await Axios.post('http://localhost:5000/api/receipts/create', formData, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Failed to create receipt, an error occurred', error)
    return error.response?.data?.message
  }
}

// 3. GET: Trigger downloadable PDF copy of individual records
export const triggerReceiptDownload = async (requestId) => {
  try {
    const response = await Axios.get(`http://localhost:5000/api/requests/download/${requestId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      responseType: 'blob' 
    });

    const fileBlob = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = window.URL.createObjectURL(fileBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.setAttribute('download', `Receipt_${requestId}.pdf`);
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    downloadLink.remove();
    window.URL.revokeObjectURL(fileURL);

  } catch (error) {
    console.error("Failed to construct local document handle download:", error);
    alert("Could not process receipt document download.");
  }
};