import { useEffect, useState } from "react"
import { getSuppliers } from '../../../services/supplierServices'
import { getItems } from '../../../services/itemService'
import { generateReceipt } from "../../../services/receiptService"
import Spinner from "../../../components/Spinner/Spinner"
import Backdrop from "../../../HOC/Backdrop/Backdrop"
import Select from 'react-select'

const Receipt = () => {
  const [serverMsg, setServerMsg] = useState('')
  const [suppliers, setSuppliers] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    supplier: '',
    item: '', 
    quantityReceived: '',
    category: '',
    unit: ''
  })

  const fetchSuppliers = async () => {
    try {
      const results = await getSuppliers()
      setSuppliers(results || [])
    } catch (error) {
      console.error("Failed to load suppliers:", error)
    }
  }

  const fetchItems = async () => {
    try {
      const results = await getItems()
      setItems(results || [])
    } catch (error) {
      console.error("Failed to load items:", error)
    }
  }

  useEffect(() => {
    fetchSuppliers()
    fetchItems()
  }, [])

  // Map MongoDB data into standard format required by react-select
  const itemOptions = items.map(item => ({
    value: item._id,
    label: `${item.name} (${item.category})`,
    rawItem: item
  }));

  const supplierOptions = suppliers.map(sup => ({
    value: sup._id,
    label: sup.name
  }));

  // Handle Searchable Item changes
  const handleItemChange = (selectedOption) => {
    if (serverMsg) setServerMsg('')
    
    if (selectedOption) {
      const { rawItem } = selectedOption;
      setFormData({
        ...formData,
        item: selectedOption.value,
        category: rawItem.category || '', 
        unit: rawItem.unit || ''          
      });
    } else {
      setFormData({ ...formData, item: '', category: '', unit: '' });
    }
  };

  const handleSupplierChange = (selectedOption) => {
    if (serverMsg) setServerMsg('')
    
    setFormData({
      ...formData,
      supplier: selectedOption ? selectedOption.value : ''
    });
  };
  
  // Guard-rail validation prior to launching authorization modal
  const handleOpenConfirmation = () => {
    if (!formData.item) return alert("Please select an item.")
    if (!formData.quantityReceived || Number(formData.quantityReceived) <= 0) {
      return alert("Please enter a valid quantity greater than 0.")
    }
    if (!formData.supplier) return alert("Please select a supplier.")
    
    setShowModal(true)
  }

  // Process verified data payload to backend architecture
  const receiptSubmitHandler = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setLoading(true)
    setShowModal(false)
    
    try {
      const response = await generateReceipt(formData)
      if (response) {
        setServerMsg(response.message || "Receipt recorded successfully!")
      }
      
      setFormData({
        supplier: '',
        item: '', 
        quantityReceived: '',
        category: '',
        unit: ''
      })
    } catch (error) {
      console.error("Error creating receipt:", error)
      alert("Failed to submit receipt. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="additem p-4 flex justify-center items-start">
      {showModal && (
        <Backdrop 
          title="Update Item Inventory?" 
          action="Are you sure you want to save this receipt and restock this item?" 
          confirm={receiptSubmitHandler} 
          cancel={() => setShowModal(false)}
        />
      )}

      <form 
        className="flex flex-col w-full max-w-[600px] bg-white shadow-xl border border-gray-100 p-6 rounded-xl mt-4" 
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Item Receipt</h2>
        
        {serverMsg && (
          <p className="text-center text-sm font-medium text-green-600 bg-green-50 border border-green-100 rounded-lg p-3 mb-5 flex items-center justify-center gap-2">
            <i className="fas fa-check-circle"></i> {serverMsg}
          </p>
        )}

        {/* Searchable Item Dropdown */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 text-sm mb-1">Search Item</label>
          <Select
            options={itemOptions}
            onChange={handleItemChange}
            value={itemOptions.find(opt => opt.value === formData.item) || null}
            isClearable
            isDisabled={loading}
            placeholder="Type to search items..."
            className="text-sm text-gray-700"
          />
        </div>

        {/* Categories and Units Displays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-600 text-sm mb-1 block">Category</label>
            <input
              className="mb-4 w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed text-sm focus:outline-none"
              type="text" 
              placeholder="Category"
              value={formData.category} 
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold text-gray-600 text-sm mb-1 block">Unit</label>
            <input
              className="mb-4 w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed text-sm focus:outline-none"
              type="text" 
              placeholder="Unit"
              value={formData.unit} 
              readOnly
            />
          </div>
        </div>

        <label className="font-semibold text-gray-600 text-sm mb-1">Quantity Received</label>
        <input
          className="mb-4 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-600 outline-none transition-all disabled:bg-gray-50 text-sm"
          type="number" 
          id="quantity" 
          min="1"
          placeholder="Enter quantity received"
          value={formData.quantityReceived}
          onChange={(e) => {
            if (serverMsg) setServerMsg('')
            setFormData({...formData, quantityReceived: e.target.value})
          }}
          disabled={loading}
        />

        {/* Searchable Supplier Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-600 text-sm mb-1">Search Supplier</label>
          <Select
            options={supplierOptions}
            onChange={handleSupplierChange}
            value={supplierOptions.find(opt => opt.value === formData.supplier) || null}
            isClearable
            isDisabled={loading}
            placeholder="Type to search suppliers..."
            className="text-sm text-gray-700"
          />
        </div>

        <button 
          type="button" 
          disabled={loading}
          className={`p-3 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-sm ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-800 hover:bg-blue-900 active:transform active:scale-[0.99]'
          }`}
          onClick={handleOpenConfirmation}
        >
          {loading ? (
            <>
              <Spinner size='sm'/>
              <span>Processing Receipt...</span>
            </>
          ) : (
            <>
              <i className="fas fa-file-invoice"></i>
              <span>Submit Receipt</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default Receipt;