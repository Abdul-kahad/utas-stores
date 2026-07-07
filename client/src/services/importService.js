import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

export const uploadInventoryExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Must match upload.single('file') parameter naming on server

    // Grab your JWT token dynamically from wherever you persist auth state
    const token = localStorage.getItem("accessToken"); 

    const response = await axios.post(`${API_URL}/import-excel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Excel upload service error:", error);
    throw error.response?.data || { message: "Network connection error processing spreadsheet." };
  }
};