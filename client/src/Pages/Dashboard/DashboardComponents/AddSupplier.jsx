import { useState } from "react";
import { addSupplier }  from "../../../services/supplierServices";

const AddSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    region: "Northern"
  });

  const regions = [
    'Greater Accra', 'Ashanti', 'Western', 'Northern', 'Central', 
    'Eastern', 'Volta', 'Bono', 'Upper East', 'Upper West',
    'Savannah', 'Bono East', 'Ahafo', 'Western North', 'Oti', 'North East'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const payload = {
      name: formData.name,
      email: formData.email,
      address: {
        street: formData.street,
        city: formData.city,
        region: formData.region
      }
    };

    try {
        console.log(payload)
      await addSupplier(payload);
      setStatus({ type: "success", message: "Supplier registered successfully!" });
      
      setFormData({
        name: "",
        email: "",
        street: "",
        city: "",
        region: "Northern"
      });
    } catch (error) {
      console.error("Supplier Submission Error:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to save supplier. Check server connection."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-5">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Register New Supplier</h2>
        </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Supplier/Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Kahad tech"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Official Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g., contact@kahadtech.gh"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Physical Operating Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Street / Area</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="e.g., Hausa Zongo"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Town / City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Tamale"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Administrative Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {status.message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${
              status.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"
            }`}>
              {status.message}
            </div>
          )}
          
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Registering..." : "Register Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;