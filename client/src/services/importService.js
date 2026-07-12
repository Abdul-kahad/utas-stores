import API from "../api/api";

export const uploadInventoryExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("accessToken"); 

    const response = await API.post(`/items/import-excel`, formData);

    return response.data;
  } catch (error) {
    console.error("Excel upload service error:", error);
    throw error.response?.data || { message: "Network connection error processing spreadsheet." };
  }
};