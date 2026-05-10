
const Issuing = () => {
  return (
    <div className="inventory p-5">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr>
            <th className="rounded p-4">Requested Item(s)</th>
            <th className="rounded p-4">Category</th>
            <th className="rounded p-4">Unit</th>
            <th className="rounded p-4">Quantity</th>
            <th className="rounded p-4">Requested By</th>
            <th className="rounded p-4">Approve  By</th>
            <th className="rounded p-4">Date</th>
            <th className="rounded p-4">Status</th>
          </tr>
        </thead>
        <tbody >
          <tr className="rounded bg-gray-100">
            <td className="p-4">Lenovo Laptop</td>
            <td className="p-4">Electonics</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">8</td>
            <td className="p-4">Patron</td>
            <td className="p-4">Store Manger</td>            
            <td className="p-4">12-3-2026</td>
            <td className="p-4"><div className="px-3 py-1 bg-yellow-500 text-white rounded">Pending</div></td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">Office Chier</td>
            <td className="p-4">Furniture</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">3</td>
            <td className="p-4">Src President</td>
            <td className="p-4">Store Manger</td>            
            <td className="p-4">2-9-2026</td>
            <td className="p-4"><div className="px-3 py-1 bg-green-500 text-white rounded">Fullfilled</div></td>
          </tr>
          <tr className="rounded bg-gray-100">
            <td className="p-4">Hand Sanitiser</td>
            <td className="p-4">Maintenence</td>
            <td className="p-4">Box</td>
            <td className="p-4">56</td>
            <td className="p-4">HOD</td>
            <td className="p-4">Store Manger</td>            
            <td className="p-4">1-2-2026</td>
            <td className="p-4"><div className="px-3 py-1 bg-blue-500 text-white rounded">Approved</div></td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">A4 Pappers</td>
            <td className="p-4">Materal</td>
            <td className="p-4">Box</td>
            <td className="p-4">13</td>
            <td className="p-4">Secretary</td>
            <td className="p-4">Store Manger</td>            
            <td className="p-4">12-12-2026</td>
            <td className="p-4"><div className="px-3 py-1 bg-red-500 text-white rounded">Rejected</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Issuing