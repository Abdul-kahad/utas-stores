import { useEffect, useState } from "react"
import {getItems, deleteItem} from '../../../services/itemService'
import Spinner from "../../../components/Spinner/Spinner"
import Backdrop from "../../../HOC/Backdrop/Backdrop"
import * as XLSX from 'xlsx'; // 👈 Import the Excel library

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [formData, setFormData] = useState({})
  const [itemId, setItemId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)



  const fetchItems = async () => {
     try {
          // setLoading(true)
          const results = await getItems()
          if (results) setInventory(results || [])
        } catch (error) {
          console.error("Error fetching suppliers:", error)
        } finally {
          setLoading(false)
        }
  }

  useEffect(() => {
        fetchItems()
      },[])

  // 1. The Core Excel Export Function
  const handleExportToExcel = () => {
    if (inventory.length === 0) {
      return alert("No inventory items available to export.");
    }

    // 2. Map and format your data cleanly for the spreadsheet columns
    const formattedData = inventory.map((item, index) => ({
      "S/N": index + 1,
      "Item ID": item._id?.substring(18, 24).toUpperCase() || 'N/A',
      "Item Name": item.name || 'Unnamed',
      "Category": item.category || 'Unassigned',
      "Current Stock": item.quantity || 0,
      "Measurement Unit": item.unit || 'Pcs',
      "Last Updated": item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A'
    }));

    // 3. Create a virtual Excel Worksheet from our JSON data array
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 4. Create an empty Excel Workbook structure
    const workbook = XLSX.utils.book_new();

    // 5. Append the worksheet into the workbook package and name the sheet tab
    XLSX.utils.book_append_sheet(workbook, worksheet, "Master Inventory");

    // 6. Set column widths automatically so text isn't cut off inside Excel
    const maxColumnWidths = Object.keys(formattedData[0]).map(key => ({
      wch: Math.max(key.length, ...formattedData.map(row => row[key]?.toString().length || 0)) + 3
    }));
    worksheet['!cols'] = maxColumnWidths;

    // 7. Write the file data package and trigger instant browser file download
    XLSX.writeFile(workbook, `Master_Inventory_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const deleteItemHandler = async (itemId) => {
    setShowModal(false)
    await deleteItem(itemId)
  }
  
  return (
    <div className="inventory p-2">
      {showModal ? <Backdrop title="Delete Item?" action="Are you sure you want to delete this item" confirm={() => deleteItemHandler(itemId)} cancel={() => setShowModal(false)}/> : ''}
      {loading ? (
        <span className="mt-20 w-full flex justify-center">
          <Spinner size='xxxl'/>
        </span>
      ) : !inventory || inventory.length < 1 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No Items registered in the database yet.
        </div>
      ) : 
      <div className="w-full">
        <div className="heading flex justify-between p-3 mb-4">
          <h2 className="text-3xl font-bold text-gray-700">Inventory Items</h2>
          {/* The Excel Export Trigger Button */}
        <button
          type="button"
          onClick={handleExportToExcel}
          disabled={loading || inventory.length === 0}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg border shadow-sm transition-all text-white ${
            loading || inventory.length === 0
              ? 'bg-emerald-400/50 border-emerald-200 cursor-not-allowed'
              : 'bg-emerald-600 border-emerald-700 hover:bg-emerald-700 active:scale-[0.98]'
          }`}
        >
          <i className="fas fa-file-excel text-sm"></i>
          Export to Excel
        </button>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-12rem)] bg-white border border-gray-200 rounded-xl shadow-sm">
          <table className="table-auto w-full text-left border-collapse">
            
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Item Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Category</th>
                <th className="px-6 py-4 whitespace-nowrap">Unit</th>
                <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
                <th className="px-6 py-4 whitespace-nowrap text-center"></th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {
                inventory.map((item) => (
                  
                  <tr 
                    key={item._id} 
                    className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {item.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {item.unit || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">
                      {item.quantity ?? 0}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button 
                        className="px-3 py-1 text-xs font-medium bg-white text-red-700 border border-red-300 hover:bg-red-50 rounded-md shadow-sm transition-colors" 
                        onClick={() => {setShowModal(true);  setItemId(item._id);}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  )
}

export default Inventory