import { useEffect, useState } from "react"
import {getItems, updateItem, deleteItem} from '../../../services/itemService'

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [formData, setFormData] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [itemId, setItemId] = useState('')

  const fetchItems = async () => {
      const results = await getItems()
      if (results) setInventory(results)
  }

  useEffect(() => {
        fetchItems()
      },[])

  const updateItemHandler = async (itemId, formData) => {
    const result = await updateItem(itemId, formData)
    if (result) {
      setIsUpdating(false)
      setFormData({})
      setItemId('')
      fetchItems()
    }
  }

  const deleteItemHandler = async (itemId) => {
    await deleteItem(itemId)
  }
  
  return (
    <div className="inventory p-5">
      <table className="table-auto w-full text-left ">
        <thead className="text-sm">
          <tr>
            <th className="rounded p-4">Item Name</th>
            <th className="rounded p-4">Category</th>
            <th className="rounded p-4">Unit</th>
            <th className="rounded p-4">Quantity</th>
            <th className="rounded p-4">Edit</th>
          </tr>
        </thead>
        <tbody >
          { !isUpdating ? inventory.map(item => (
            <tr className="rounded bg-gray-100 border-b border-gray-200" key={item._id}>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.unit}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => {setIsUpdating(true); setItemId(item._id)}} >update</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded ml-2" onClick={() => deleteItemHandler(item._id)}>delete</button>
              </td>
            </tr>
          )) :
            inventory.filter(item => item._id === itemId).map(item => (
              <tr className="rounded bg-gray-100 border-b border-gray-200" key={item._id}>
              <td className="p-4"><input className="bg-white p-1 rounded" type="text" value={formData.name || item.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/></td>
              <td className="p-4"><input className="bg-white p-1 rounded" type="text" value={formData.category || item.category} onChange={(e) => setFormData({...formData, category: e.target.value})}/></td>
              <td className="p-4"><input className="bg-white p-1 rounded" type="text" value={formData.unit || item.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}/></td>
              <td className="p-4"><input className="bg-white p-1 rounded" type="number" value={formData.quantity || item.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}/></td>
              <td className="p-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => updateItemHandler(itemId, formData)} >update</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Inventory