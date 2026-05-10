
const RequestItem = () => {
  return (
    <div className="RequestItem p-5 flex justify-center ">

      <div className="inventory p-5">
        <table className="table-auto w-full text-left ">
          <thead>
            <tr>
              <th className="rounded p-4">Item Name</th>
              <th className="rounded p-4">
                <select className="p-1">
                  <option value="Electronis">Electronics</option>
                  <option value="Electronis">Furniture</option>
                  <option value="Electronis">Maintenence</option>
                  <option value="Electronis">Materal</option>
                </select>
              </th>
              <th className="rounded p-4">Unit</th>
              <th className="rounded p-4">Quantity</th>
              <th className="rounded p-4">Request</th>
            </tr>
          </thead>
          <tbody >
            <tr className="rounded bg-gray-100">
              <td className="p-4">Lenovo Laptop</td>
              <td className="p-4">Electonics</td>
              <td className="p-4">Pcs</td>
              <td className="p-4"> <input type="text" className="w-15 p-1 bg-white" placeholder="eg. 15"/></td>
              <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded">Add</button></td>
            </tr>
            <tr className="rounded bg-gray-50">
              <td className="p-4">Office Chier</td>
              <td className="p-4">Furniture</td>
              <td className="p-4">Pcs</td>
              <td className="p-4"> <input type="text" className="w-15 p-1 bg-white" placeholder="eg. 15"/></td>
              <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded">Add</button></td>
            </tr>
            <tr className="rounded bg-gray-100">
              <td className="p-4">Hand Sanitiser</td>
              <td className="p-4">Maintenence</td>
              <td className="p-4">Box</td>
              <td className="p-4"> <input type="text" className="w-15 p-1 bg-white" placeholder="eg. 15"/></td>
              <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded">Add</button></td>
            </tr>
            <tr className="rounded bg-gray-50">
              <td className="p-4">A4 Pappers</td>
              <td className="p-4">Materal</td>
              <td className="p-4">Box</td>
              <td className="p-4"> <input type="text" className="w-15 p-1 bg-white" placeholder="eg. 15"/></td>
              <td className="p-4"><button className="px-3 py-1 bg-green-500 text-white rounded">Add</button></td>
            </tr>
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