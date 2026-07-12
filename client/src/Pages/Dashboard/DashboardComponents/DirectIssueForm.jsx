import { useEffect, useState } from "react"
import { getItems } from '../../../services/itemService'
import { submitDirectIssue } from '../../../services/requestService'
import { getAllUsers } from "../../../services/userServices"
import Select from 'react-select'
import Spinner from "../../../components/Spinner/Spinner"

const DirectIssueForm = () => {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [serverMsg, setServerMsg] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    recipientId: '',
    item: '',
    quantityIssued: '',
    category: '',
    unit: ''
  })

  useEffect(() => {
    const loadRequiredData = async () => {
      try {
        const fetchedItems = await getItems()
        const fetchedUsers = await getAllUsers() 
        console.log('Fetched items:', fetchedItems)
        console.log('Fetched users:', fetchedUsers)
        setItems(fetchedItems || [])
        setUsers(fetchedUsers?.users || [])
      } catch (error) {
        console.error("Initialization gathering failure:", error)
      }
    }
    loadRequiredData()
  }, [])

  const itemOptions = items.map(item => ({
    value: item._id,
    label: `${item.name} (Available: ${item.quantity} ${item.unit || 'Pcs'})`,
    rawItem: item
  }));

  const userOptions = users.map(user => ({
    value: user._id,
    label: `${user.name} [${user.role || 'Staff'}]`
  }));

  const handleItemChange = (selectedOption) => {
    setServerMsg({ type: '', text: '' })
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recipientId || !formData.item || !formData.quantityIssued) {
      return alert("Please enter all fields.");
    }

    setLoading(true)
    setServerMsg({ type: '', text: '' })

    try {
      const result = await submitDirectIssue(formData)
      setServerMsg({ type: 'success', text: result.message || "Allocation verified and stored." })
      
      setFormData({ recipientId: '', item: '', quantityIssued: '', category: '', unit: '' })
    } catch (error) {
      setServerMsg({ type: 'error', text: error.toString() })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="p-4 flex justify-center items-start min-h-[85vh]">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[600px] bg-white shadow-xl border border-gray-100 p-6 rounded-xl mt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">Direct Manual Allocation</h2>

        {serverMsg.text && (
          <div className={`text-sm font-medium p-3 mb-5 rounded-lg border flex items-center gap-2 ${
            serverMsg.type === 'success' 
              ? 'text-green-700 bg-green-50 border-green-200' 
              : 'text-red-700 bg-red-50 border-red-200'
          }`}>
            <i className={`fas ${serverMsg.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
            {serverMsg.text}
          </div>
        )}

       
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 text-sm mb-1">Issue To (Recipient)</label>
          <Select
            options={userOptions}
            value={userOptions.find(opt => opt.value === formData.recipientId) || null}
            onChange={(opt) => setFormData({ ...formData, recipientId: opt ? opt.value : '' })}
            isClearable
            placeholder="Search by executive name or office..."
            className="text-sm text-gray-700"
            isDisabled={loading}
          />
        </div>

       
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 text-sm mb-1">Select Stock Item</label>
          <Select
            options={itemOptions}
            value={itemOptions.find(opt => opt.value === formData.item) || null}
            onChange={handleItemChange}
            isClearable
            placeholder="Type item name to cross-check quantities..."
            className="text-sm text-gray-700"
            isDisabled={loading}
          />
        </div>

        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-600 text-sm mb-1 block">Category</label>
            <input
              className="mb-4 w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed focus:outline-none"
              type="text" value={formData.category} placeholder="Auto-calculated" readOnly
            />
          </div>
          <div>
            <label className="font-semibold text-gray-600 text-sm mb-1 block">Unit</label>
            <input
              className="mb-4 w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed focus:outline-none"
              type="text" value={formData.unit} placeholder="Auto-calculated" readOnly
            />
          </div>
        </div>

       
        <label className="font-semibold text-gray-600 text-sm mb-1">Quantity Issued</label>
        <input
          type="number"
          min="1"
          className="mb-6 p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all disabled:bg-gray-50 text-gray-700"
          placeholder="Enter quantity physically handed over"
          value={formData.quantityIssued}
          onChange={(e) => setFormData({ ...formData, quantityIssued: e.target.value })}
          disabled={loading}
        />

       
        <button
          type="submit"
          disabled={loading}
          className={`p-3 text-white font-medium rounded-lg shadow-sm text-sm transition-all flex items-center justify-center gap-2 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'
          }`}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span>Deducting Inventory balances...</span>
            </>
          ) : (
            <>
              <i className="fas fa-boxes"></i>
              <span>Complete Direct Issue</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default DirectIssueForm;