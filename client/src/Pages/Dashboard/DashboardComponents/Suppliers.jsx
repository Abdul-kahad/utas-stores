import { useEffect, useState } from "react"
import { getSuppliers } from '../../../services/supplierServices'
import Spinner from "../../../components/Spinner/Spinner"

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const results = await getSuppliers()
        setSuppliers(results)
      } catch (error) {
        console.error("Error fetching suppliers:", error)
      } finally {
        setLoading(false)
      }
    };
    fetchSuppliers() 
  }, [])

  return (
    <div className="suppliers p-5">
      {loading ? (
        <span className="mt-20 w-full flex justify-center">
          <Spinner size='xxxl'/>
        </span>
      ) : !suppliers || suppliers.length < 1 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No suppliers registered in the database yet.
        </div>
      ) : (
        <div className="w-full max-w-full">
          <div className="overflow-x-auto overflow-y-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
            <table className="table-auto w-full text-left border-collapse">
              
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Supplier Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Official Email</th>
                  <th className="px-6 py-4 whitespace-nowrap">Location Details</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {suppliers.map((supplier) => (
                  <tr 
                    key={supplier._id} 
                    className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
                  >
                    {/* Supplier Name */}
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {supplier.name || 'N/A'}
                    </td>
                    
                    {/* Email (Updated from supplier.contact) */}
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {supplier.email || 'N/A'}
                    </td>
                    
                    {/* Address (Safely mapping nested object properties) */}
                    <td className="px-6 py-4 text-gray-500">
                      {supplier.address ? (
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-normal">{supplier.address.street || 'No Street'}</span>
                          <span className="text-xs text-gray-400">{supplier.address.city}, {supplier.address.region} Region</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No Address Provided</span>
                      )}
                    </td>

                    {/* Status Badge (Matches your Mongoose default: 'Active') */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        supplier.status === 'Inactive' 
                          ? 'bg-red-50 text-red-700 border border-red-100' 
                          : 'bg-green-50 text-green-700 border border-green-100'
                      }`}>
                        {supplier.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Suppliers