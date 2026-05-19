import { useEffect, useState } from "react"
import {getItems} from '../../../services/itemService'

const Restocked = () => {
    const [inventory, setInventory] = useState([])

    const fetchItems = async () => {
        const results = await getItems()
        if (results) setInventory(results)
    }
  
    useEffect(() => {
          fetchItems()
        },[])
  return (
    <div className="restocked p-5">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr>
            <th className="rounded p-4">Item Name</th>
            <th className="rounded p-4">Category</th>
            <th className="rounded p-4">Unit</th>
            <th className="rounded p-4">Quantity</th>
            <th className="rounded p-4">Supplier</th>
          </tr>
        </thead>
        <tbody >
          { inventory.map(item => (
            <tr className="rounded bg-gray-100" key={item._id}>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.unit}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">{item.supplier}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default Restocked