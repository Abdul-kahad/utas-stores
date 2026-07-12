import API from "../api/api"

export const getRestockReceipts = async () => {
  try {
    const response = await API.get('/receipts', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch restock receipts:', error)
    return []
  }
}

export const generateReceipt = async(formData) => {
  try {
    const response = await API.post('/receipts/create', formData)
    return response.data
  } catch (error) {
    console.log('Failed to create receipt, an error occurred', error)
    return error.response?.data?.message
  }
}

export const triggerReceiptDownload = async (requestId) => {
  try {
    const response = await API.get(`/requests/download/${requestId}`, {
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