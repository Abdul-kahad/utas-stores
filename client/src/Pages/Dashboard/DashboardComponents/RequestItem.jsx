import { useEffect, useState } from "react";
import { getItems, getItem } from '../../../services/itemService';
import { sendRequests } from '../../../services/requestService';
import Backdrop from "../../../HOC/Backdrop/Backdrop";
import Spinner from "../../../components/Spinner/Spinner"

const RequestItem = () => {
  const [items, setItems] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [reqItem, setReqItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const results = await getItems();
        setItems(results || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []); 

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const requestItemHandler = async () => {
    if (!reqItem.itemId || !reqItem.quantity) return;
    // console.log("Submitting Request Payload:", reqItem);
    setShowModal(false);
    setSendingRequest(true);
    setMessage('')
    const checkAvailability = async() => {
      try {
        const response = await getItem(reqItem.itemId)
        const itemQuantity = response.quantity

        if(reqItem.quantity >= itemQuantity){
          setQuantities((prev) => ({
              ...prev,
              [reqItem.itemId]: ''
            }));
          return setMessage('Item is low on stock, please try again later')
          
        }else{
            await sendRequests(reqItem);
            setQuantities((prev) => ({
              ...prev,
              [reqItem.itemId]: ''
            }));
            setReqItem({});
        }
      } catch (error) {
         console.error("Error checking quantity:", error);
      }finally{
        setSendingRequest(false);
      }
    }
    checkAvailability();
  };

  return (
    <div className="RequestItem p-2">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Store Items</h2>
      </div>
      {showModal && (
        <Backdrop 
          title="Send Request?" 
          action="Are you sure you want to send this request" 
          confirm={() => {requestItemHandler(); setSendingRequest(true);}} 
          cancel={() => { setShowModal(false); setReqItem({}); }}
        />
      )}

      {loading ? (
      <span className="mt-20 w-full flex justify-center">
        <Spinner size="xxxl" />
      </span>
      ) : items.length < 1 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500 text-sm italic">
          No items avilable.
        </div>
      ) : (<div className="overflow-y-auto h-[calc(100vh-12rem)] bg-white border border-gray-200 rounded-xl shadow-sm">
        {message && <p className="text-red-600 text-center my-1">{message}</p> }
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Item Name</th>
              <th className="px-6 py-3 whitespace-nowrap">
                <select className="bg-transparent font-semibold uppercase tracking-wider text-gray-600 focus:outline-none focus:text-blue-600 cursor-pointer pr-4 py-1 rounded">
                  <option value="">Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Material">Material</option>
                </select>
              </th>
              <th className="px-6 py-4 whitespace-nowrap">Available Quantity</th>
              <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
              <th className="px-6 py-4 whitespace-nowrap text-center">Request Item</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {items.map((item) => {
              const currentQuantity = quantities[item._id] || '';
              return (
                <tr 
                  key={item._id} 
                  className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  
                  <td className="px-6 py-3 whitespace-nowrap">
                    <input 
                      type="number" 
                      className="w-24 bg-white border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 font-medium shadow-sm" 
                      placeholder="eg. 15" 
                      min="1"
                      value={currentQuantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    />
                  </td>
                  
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button 
                      type="button"
                      disabled={!currentQuantity}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors border ${
                        currentQuantity
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-white text-gray-400 border-gray-200 cursor-not-allowed'
                      }`} 
                      onClick={() => {
                        setReqItem({ itemId: item._id, quantity: currentQuantity });
                        setShowModal(true);
                      }}
                    >
                      {sendingRequest ? <span className="flex items-center justify-center gap-2"><Spinner size='sm'/><p>Sending Request...</p></span> : <p>Send Request</p>}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default RequestItem;