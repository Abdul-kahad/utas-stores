import { useState, useRef } from "react"
import { uploadInventoryExcel } from "../../services/importService"

const ExcelImportModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  // ADD THESE MISSING STATES
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [summary, setSummary] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatusMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatusMessage({ type: "info", text: "Uploading..." });

    try {
      const result = await uploadInventoryExcel(file);
      setStatusMessage({ type: "success", text: result.message });
      setSummary(result.summary);
      console.log(result.summary)
      setFile(null); 
    } catch (error) {
      setStatusMessage({ 
          type: "error", 
          text: error.message || "Failed to sync inventory." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 border-2 border-dashed border-gray-400">
      <h3 className="mb-4">Upload Catalog Spreadsheet</h3>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".xlsx"
      />

      <button 
        onClick={() => fileInputRef.current.click()}
        className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
      >
        Select Excel File
      </button>

      {file && (
        <>
          <p className="mt-4 text-green-600">Selected: {file.name}</p>
          {/* THIS BUTTON TRIGGERS THE UPLOAD */}
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Submit File"}
          </button>
        </>
      )}

      {/* Show Messages */}
      {statusMessage && (
        <p className={`mt-4 ${statusMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {statusMessage.text}
        </p>
      )}
    </div>
  );
};

export default ExcelImportModal;