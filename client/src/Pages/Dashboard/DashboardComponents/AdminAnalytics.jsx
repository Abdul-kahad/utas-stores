import { useEffect, useState } from 'react'
import { getRequests } from '../../../services/requestService'
import { getItems } from '../../../services/itemService'
import { getSuppliers } from '../../../services/supplierServices'
import Notifications from './Notifications'

// Chart.js Core Imports
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js Modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAnalytics = () => {
  const [requests, setRequests] = useState([]) 
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState(0)

  const fetchRequests = async () => {
    const results = await getRequests()
    setRequests(results || []) 
  }

  const fetchItems = async () => {
    const results = await getItems()
    setItems(results || []);
  } 

  const fetchSuppliers = async () => {
    const results = await getSuppliers()
    setSuppliers(results?.length || 0)
  }

  const lowStockItems = items.filter(item => item.quantity <= (item.reorderLevel || 10 ));
  // console.log('Low Stock Items:', lowStockItems); // Debugging log
  
  useEffect(() => {
    fetchRequests()
    fetchItems()
    fetchSuppliers()
  }, [])

  // Chart.js Configuration
  const chartItems = items.slice(0, 6); // Grab top 6 items for spacing
  const data = {
    labels: chartItems.map(item => item.name),
    datasets: [{
      label: 'Quantity',
      data: chartItems.map(item => item.quantity),
      backgroundColor: '#3b82f6', // Tailwind blue-500
      borderRadius: 4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#f3f4f6' } }
    }
  };

  return (
    <div className="admin view">
      <div className="p-5 flex flex-col gap-5">
        
        {/* Top Stats Cards Grid */}
        <div className="grid grid-cols-4 gap-5">
          <div className="flex items-center p-4 bg-white rounded shadow-md">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-yellow-50 rounded mr-2">
              <i className="fas fa-box text-4xl text-yellow-800"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <h2 className="text-3xl font-bold">{items.length}</h2>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded shadow-md">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-yellow-100 rounded mr-2">
              <i className="fas fa-file-alt text-4xl text-yellow-500"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <h2 className="text-3xl font-bold">{requests.length}</h2> 
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded shadow-md">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-red-50 rounded mr-2">
              <i className="fas fa-level-down-alt text-4xl text-red-500"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <h2 className="text-3xl font-bold">{lowStockItems.length}</h2>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded shadow-md">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-blue-50 rounded mr-2">
              <i className="fas fa-truck text-4xl text-blue-500"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Suppliers</p>
              <h2 className="text-3xl font-bold">{suppliers}</h2>
            </div>
          </div>    
        </div>

        {/* Chart and Notifications Section */}
        <div className="grid grid-cols-5 gap-5">
          {/* Working Chart Container */}
          <div className="bg-white col-span-3 rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[250px]">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Current Stock Levels
            </h3>
            <div className="flex-1 w-full relative">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 italic">
                  No data available for charting
                </div>
              ) : (
                <Bar data={data} options={options} />
              )}
            </div>
          </div>

          <div className="h-[250px] bg-white col-span-2 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <Notifications />
          </div>
        </div>

        {/* Bottom Row: Data Table and Low Stock Alerts */}
        <div className="grid grid-cols-12 gap-5">
          <div className="bg-white col-span-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Request ID</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">
                      No active requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr className="hover:bg-gray-50/50 transition-colors duration-150" key={request._id}>
                      <td className="px-6 py-4 font-mono font-medium text-gray-900 text-xs">
                        {request._id?.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-gray-500">{request.user?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {request.items?.[0]?.item?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {request.items?.[0]?.quantity || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          {request.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white col-span-4 rounded-xl border border-gray-200 shadow-sm p-4 max-h-[300px] overflow-y-auto">
            <h2 className='text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3'>Low Stock Items</h2>
            {lowStockItems.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 italic">
                All item stock quantities are healthy.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 flex-1">
                {lowStockItems.map((item) => (
                  <li className='flex justify-between py-3 text-sm text-gray-700 font-medium' key={item._id}>
                    <span className="capitalize">{item.name}</span>
                    <span className="text-red-600 text-xs bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                    {item.quantity} left
                  </span>
                </li>
              ))}
            </ul>)}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminAnalytics;