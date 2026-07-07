import { useState } from "react";
import ExcelImportModal from "../../../components/ExcelImportModal/ExcelImportModal";
import { addItem } from "../../../services/itemService"; 

const AddItem = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  
  const [formData, setFormData] = useState({
    name: "",
    category: "General",
    unit: "Pcs",
    reorderLevel: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Ensure reorderLevel is a number
    const payload = {
      ...formData,
      reorderLevel: parseInt(formData.reorderLevel, 10)
    };

    try {
      console.log("Submitting manual item database payload:", payload);
      await addItem(payload);
      
      setStatus({ type: "success", message: "Item registered successfully!" });
      setFormData({ name: "", category: "General", unit: "Pcs", reorderLevel: 0 });
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to save item. Check console." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Register Inventory Items</h1>
        <p className="text-sm text-gray-500 mt-1">Add new asset classifications to the UTAS Central Store database registry.</p>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("manual")}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all ${
            activeTab === "manual" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Single Item (Manual Entry)
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all ${
            activeTab === "bulk" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Bulk Upload Catalog (.xlsx)
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        {activeTab === "manual" ? (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Fields */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Item Description Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Category Classification</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
                  <option value="General">General Supplies</option>
                  <option value="Electronics">Electronics & IT</option>
                  <option value="Office Supplies">Office Stationery</option>
                  <option value="Furniture">Furniture Asset</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Unit of Measurement</label>
                <input type="text" name="unit" value={formData.unit} onChange={handleInputChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Reorder Alert Level</label>
                <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleInputChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" min="0" required />
              </div>
            </div>

            {/* Status Feedback */}
            {status.message && (
              <p className={`text-sm font-medium ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {status.message}
              </p>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Catalog Item"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Bulk Upload Section */}
            <ExcelImportModal isOpen={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItem;