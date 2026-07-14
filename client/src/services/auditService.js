import API from "../api/api";

export const getAuditLogs = async () => {
  try {
    const response = await API.get('/admin/audit-logs');
    return response.data.data; 
  } catch (error) {
    console.error('Failed to retrieve system audit logs:', error);
    return []; 
  }
};