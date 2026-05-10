
const Additem = () => {
  return (
    <div className="additem p-5 flex justify-center ">
      <form className="flex flex-col w-[60%] shadow-lg p-5 rounded-lg mt-5">
        <h2 className="text-4xl font-bold text-center text-gray-500 my-10">Add new item to inventory</h2>

        <label htmlFor="name">Item Name</label>
        <input className="mb-5 p-3 border border-gray-200 rounded" type="text" id="name" placeholder="Name"/>
        <label htmlFor="category">Category</label>
        <select className="mb-5 p-3 border border-gray-200 rounded">
          <option value=""></option>
          <option value="Elecronics">Elecronics</option>
          <option value="Furnitur">Furnitur</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="category">Unit</label>
        <select className="mb-5 p-3 border border-gray-200 rounded">
          <option value=""></option>
          <option value="Elecronics">Psc</option>
          <option value="Furnitur">Box</option>
        </select>
        <button className="p-3 bg-green-500 rounded text-white text-xl">Add Item</button>
      </form>
    </div>
  )
}

export default Additem