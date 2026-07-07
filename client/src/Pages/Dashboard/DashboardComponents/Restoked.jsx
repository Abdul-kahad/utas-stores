import { useEffect, useState } from "react"
import {getItems} from '../../../services/itemService'
import Spinner from "../../../components/Spinner/Spinner"

const Restocked = () => {
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(true)
    
    const fetchItems = async () => {
       try {
          // setLoading(true)
          const results = await getItems()
           if (results) setInventory(results)
          // console.log(results)
        } catch (error) {
          console.error("Error fetching items:", error)
        } finally {
          setLoading(false)
        }
    }
  
    useEffect(() => {
          fetchItems()
        },[])
  return (
    <div className="restocked p-5 w-full max-w-full">
      {loading ? (
          <span className="mt-20 w-full flex justify-center">
            <Spinner size='xxxl'/>
          </span>
        ) : !inventory || inventory.length < 1 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No Item registered in the database yet.
          </div>
        ) : 
      <div className="overflow-x-auto overflow-y-hidden bg-white border border-gray-200 rounded-xl shadow-md">
        <table className="table-auto w-full text-left border-collaps">
        <thead className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <tr >
            <th className="px-6 py-4 whitespace-nowrap">Item Name</th>
            <th className="px-6 py-4 whitespace-nowrap">Category</th>
            <th className="px-6 py-4 whitespace-nowrap">Unit</th>
            <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
            <th className="px-6 py-4 whitespace-nowrap">Supplier</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
          { inventory.map(item => (
            <tr key={item._id} className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30" >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.supplier}</td>
            </tr>))}
        </tbody>
      </table>
      </div>}
    </div>
  )
}

export default Restocked