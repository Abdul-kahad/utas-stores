import { useState, useRef } from "react"
import { uploadInventoryExcel } from "../../services/importService"

const ExcelImportModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [summary, setSummary] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatusMessage(null);
      setSummary(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatusMessage({ type: "info", text: "Processing spreadsheet..." });

    try {
      const result = await uploadInventoryExcel(file);
      
      setStatusMessage({ type: "success", text: result.message || "Catalog synced successfully!" });
      setSummary(result.summary);
      console.log("Upload Summary:", result.summary);
      
      setFile(null); 
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    } catch (error) {
      const backendError = error.response?.data?.message || error.message || "Failed to sync inventory.";
      setStatusMessage({ 
          type: "error", 
          text: backendError
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to dynamically style status messages safely
  const getStatusColor = () => {
    if (!statusMessage) return "";
    if (statusMessage.type === "error") return "text-red-600 bg-red-50 border-red-200";
    if (statusMessage.type === "info") return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-green-600 bg-green-50 border-green-200"; 
  };

  return (
    <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white relative max-w-full mx-auto shadow-lg">

      <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Catalog Spreadsheet</h3>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".xlsx, .xls" 
      />

      <div className="flex gap-2">
        <button 
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-700 hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded font-medium"
          disabled={loading}
        >
          Select Excel File
        </button>
        
      </div>

      {file && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-700 font-medium">Selected File:</p>
          <p className="text-sm text-green-600 truncate mb-4">{file.name}</p>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {summary && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">Import Report:</p>
          <ul className="list-disc list-inside">
            <li>Created: {summary.newItemsRegistered || 0} items</li>
            <li>Updated: {summary.existingItemConfigsUpdated || 0} items</li>
            <li>Skipped/Errors: {summary.totalRowsParsed || 0} rows</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExcelImportModal;