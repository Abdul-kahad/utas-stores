
const Restocked = () => {
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
          <tr className="rounded bg-gray-100">
            <td className="p-4">Lenovo Laptop</td>
            <td className="p-4">Electonics</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">8</td>
            <td className="p-4">Kahad I.T Gadgets</td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">Office Chier</td>
            <td className="p-4">Furniture</td>
            <td className="p-4">Pcs</td>
            <td className="p-4">3</td>
            <td className="p-4">Global Funiture</td>
          </tr>
          <tr className="rounded bg-gray-100">
            <td className="p-4">Hand Sanitiser</td>
            <td className="p-4">Maintenence</td>
            <td className="p-4">Box</td>
            <td className="p-4">56</td>
            <td className="p-4">Smart Home</td>
          </tr>
          <tr className="rounded bg-gray-50">
            <td className="p-4">A4 Pappers</td>
            <td className="p-4">Materal</td>
            <td className="p-4">Box</td>
            <td className="p-4">13</td>
            <td className="p-4">Double way book shop</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Restocked