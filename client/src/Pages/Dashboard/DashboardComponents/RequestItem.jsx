import { useEffect, useState } from "react"
import {getItems, getItem} from '../../../services/itemService'
import {sendRequests} from '../../../services/requestService'

const RequestItem = () => {
    const [items, setItems] = useState([])
    const [formData, setFormData] = useState({})
        useEffect(() => {
          const fetchItems = async () => {
            const results = await getItems()
            setItems(results)
          }
          fetchItems()
        },[items])
  
    const requestItemHandler = async (formData) => {
      console.log(formData)
      await sendRequests(formData)
      setFormData({
          itemId: '',
          quantity: ''
      })
    }

  return (
    <div className="RequestItem p-5 flex flex-col justify-center ">

      <div className="inventory p-5">
        <table className="table-auto w-full text-left ">
          <thead className="text-sm">
            <tr>
              <th className="rounded p-4">Item Name</th>
              <th className="rounded p-4">
                <select className="p-1">
                  <option value="Electronics">Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Material">Material</option>
                </select>
              </th>
              <th className="rounded p-4">Unit</th>
              <th className="rounded p-4">Quantity</th>
              <th className="rounded p-4">Request Item</th>
            </tr>
          </thead>
          <tbody >
            {items.map(item => (
              <tr className="rounded bg-gray-100 border-b border-gray-200" key={item._id} >
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.unit}</td>
              <td className="p-4"><input type="text" className="w-15 p-1 bg-white" placeholder="eg. 15" onChange={(e) => setFormData({...formData, quantity: e.target.value}) } value={formData.quantity}/></td>
              <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => requestItemHandler({...formData, itemId: item._id})}>Send Request</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="flex flex-col w-[40%] shadow-lg p-5 rounded-lg mt-5">
        <h2 className="text-4xl font-bold text-center text-gray-500 my-10">Request item by name</h2>

        <label htmlFor="name">Item Name</label>
        <input className="mb-5 p-3 border border-gray-200 rounded" type="text" id="name" placeholder="Name"/>
       
        <label htmlFor="category">Quantity</label>
        <input className="mb-5 p-3 border border-gray-200 rounded" type="text" id="name" placeholder="Quantity"/>
        <button className="p-3 bg-green-500 rounded text-white text-xl">Send Request</button>
      </form>
    </div>
  )
}

export default RequestItem