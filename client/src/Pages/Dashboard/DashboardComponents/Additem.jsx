import { useEffect, useState } from "react"
import {addItem} from '../../../services/itemService'
import {getSuppliers} from '../../../services/supplierServices'


const Additem = () => {
    const [serverMsg, setServerMsg] = useState('')
    const [suppliers, setSuppliers] = useState([])
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      unit: '',
      quantity: '',
      supplier: ''
     })

    const fetchSuppliers = async () => {
                    const results = await getSuppliers()
                    setSuppliers(results)
                  }
    useEffect(() => {
                    fetchSuppliers()
                  },[])

    const addItemHandler = async (e) => {
      e.preventDefault()
      const msg = await addItem(formData)
      if (msg) setServerMsg(msg)
      console.log(serverMsg)
      setFormData({
        name: '',
        category: '',
        unit: '',
        quantity: '',
        supplier: ''
      })
    }
  return (
    <div className="additem p-5 flex justify-center ">
      <form className="flex flex-col w-[60%] shadow-lg p-5 rounded-lg mt-5" onSubmit={(e) => {addItemHandler(e)}}>
        <h2 className="text-4xl font-bold text-center text-gray-500 my-6">Add new item to inventory</h2>
        {serverMsg && <p className="text-center text-green-500 mb-5">{serverMsg}</p>}
        <label htmlFor="name">Item Name</label>
        <input 
          className="mb-5 p-2 border border-gray-200 rounded" 
          type="text" id="name" placeholder="Name" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}/>
        <label htmlFor="category">Category</label>
        <select 
          className="mb-5 p-2 border border-gray-200 rounded" 
          value={formData.category} 
          onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option value=""></option>
          <option value="Elecronics">Elecronics</option>
          <option value="Furnitur">Furnitur</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="unit">Unit</label>
        <select 
          className="mb-5 p-2 border border-gray-200 rounded" 
          value={formData.unit} 
          onChange={(e) => setFormData({...formData, unit: e.target.value})}>
          <option value=""></option>
          <option value="Psc">Psc</option>
          <option value="Box">Box</option>
        </select>
        <label htmlFor="quantity">Quantity</label>
        <input 
          className="mb-5 p-2 border border-gray-200 rounded"
          type="number" id="quantity" placeholder="Quantity"
          value={formData.quantity} 
          onChange={(e) => setFormData({...formData, quantity: e.target.value})}/>
        <label htmlFor="supplier">Supplier</label>
        <select 
          className="mb-5 p-2 border border-gray-200 rounded" 
          value={formData.supplier}
          onChange={(e) => setFormData({...formData, supplier: e.target.value})}>
          <option value=""></option>
          {suppliers.map(supplier => (
            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
          ))}
        </select>
        <button className="p-2 bg-green-500 rounded text-white text-xl">Add Item</button>
      </form>
    </div>
  )
}

export default Additem