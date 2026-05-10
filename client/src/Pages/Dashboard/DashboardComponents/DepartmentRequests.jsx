
const DepartmentRequests = () => {
  return (
    <div className="DepartmentRequests p-5">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr>
            <th className="rounded p-4">Requested Item(s)</th>
            <th className="rounded p-4">Category</th>
            <th className="rounded p-4">Unit</th>
            <th className="rounded p-4">Quantity</th>
            <th className="rounded p-4">Status</th>
            <th className="rounded p-4">Action</th>
          </tr>
        </thead>
        <tbody >
          <tr className="rounded bg-gray-100">
            <td className="p-4">Lenovo Laptop</td>
            <td className="p-4">Electonics</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">8</td>
            <td className="p-4"><button className="px-3 py-1 bg-yellow-500 text-white rounded">Pending</button></td>
            <td className="p-4"><button className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button></td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">Office Chier</td>
            <td className="p-4">Furniture</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">3</td>
            <td className="p-4"><button className="px-3 py-1 bg-blue-500 text-white rounded">Approve</button></td>
            <td className="p-4"><button className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button></td>
          </tr>
          <tr className="rounded bg-gray-100">
            <td className="p-4">Hand Sanitiser</td>
            <td className="p-4">Maintenence</td>
            <td className="p-4">Box</td>
            <td className="p-4">56</td>
            <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded">Approve</button></td>
            <td className="p-4"><button className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button></td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">A4 Pappers</td>
            <td className="p-4">Materal</td>
            <td className="p-4">Box</td>
            <td className="p-4">13</td>
            <td className="p-4"><button className="px-3 py-1 bg-red-500 text-white rounded">Rejected</button></td>
            <td className="p-4"><button className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentRequests