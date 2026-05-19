import { useEffect, useState } from "react"
import {getSuppliers} from '../../../services/supplierServices'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
            useEffect(() => {
              const fetchSuppliers = async () => {
                const results = await getSuppliers()
                setSuppliers(results)
              }
              fetchSuppliers()
            },[])
  return (
    <div className="suppliers p-5">
      <table className="table-auto w-full text-left ">
        <thead className="text-sm">
          <tr>
            <th className="rounded p-4">Supplier Name</th>
            <th className="rounded p-4">Contact</th>
            <th className="rounded p-4">Address</th>
          </tr>
        </thead>
        <tbody >
          {suppliers.map(supplier => (
            <tr className="rounded bg-gray-100 border-b border-gray-200" key={supplier._id}>
              <td className="p-4">{supplier.name}</td>
              <td className="p-4">{supplier.contact}</td>
              <td className="p-4">{supplier.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Suppliers