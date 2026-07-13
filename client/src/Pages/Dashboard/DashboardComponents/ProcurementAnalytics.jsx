import { useEffect, useState } from 'react'
import { getRequests } from '../../../services/requestService'
import { getItems } from '../../../services/itemService'
import { getSuppliers } from '../../../services/supplierServices'

// Chart.js Core Imports for Line Chart
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Line Chart Modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ProcurementAnalytics = () => {
  const [requests, setRequests] = useState([]) 
  const [items, setItems] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProcurementData = async () => {
    try {
      setLoading(true)
      const [requestsResult, itemsResult, suppliersResult] = await Promise.all([
        getRequests(),
        getItems(),
        getSuppliers()
      ])

      setRequests(requestsResult || [])
      setItems(itemsResult || [])
      setSuppliers(suppliersResult || [])
    } catch (error) {
      console.error("Error loading procurement datasets:", error)
    } finally {
      setLoading(false)
    }
  }

  const lowStockItems = items.filter(item => item.quantity <= (item.reorderLevel || 10))

  useEffect(() => {
    fetchProcurementData()
  }, [])

  // 3. Chart.js Configurations: Line Chart mapping critical restocking items
  const chartItems = lowStockItems.slice(0, 6);
  const chartData = {
    labels: chartItems.map(item => item.name),
    datasets: [
      {
        label: 'Current Quantity',
        data: chartItems.map(item => item.quantity),
        borderColor: '#ef4444', // Red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // Light Red Fill
        borderWidth: 2,
        tension: 0.3, // Curve smoothness
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        min: 0,
        grid: { color: '#f3f4f6' },
        ticks: { stepSize: 2 }
      }
    }
  };

  return (
    <div className="admin view">
      <div className="p-5 flex flex-col gap-5">
        
        <div className="flex justify-between items-center p-6 rounded-xl bg-blue-50/60 border border-blue-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Procurement Dashboard</h2>
          </div>
          {loading && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">
              Syncing...
            </span>
          )}
        </div>

        <div className="grid gap-5">
          <div className="grid grid-cols-3 gap-5">
            
            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-blue-50 rounded-lg mr-3">
                <i className="fas fa-truck text-3xl text-blue-600"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Suppliers</p>
                <h2 className="text-3xl font-bold text-gray-900">{suppliers.length}</h2>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-red-50 rounded-lg mr-3">
                <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
                <h2 className="text-3xl font-bold text-gray-900">{lowStockItems.length}</h2>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-amber-50 rounded-lg mr-3">
                <i className="fas fa-shopping-cart text-3xl text-amber-600"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders Placed</p>
                <h2 className="text-3xl font-bold text-gray-900">{requests.length}</h2>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[240px]">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Items To Restock</h3>
            <ul className="divide-y divide-gray-100 overflow-y-auto flex-1 pr-1">
              {lowStockItems.length === 0 ? (
                <li className="py-3 text-sm text-gray-400 italic">All item stock quantities are healthy.</li>
              ) : (
                lowStockItems.map((item) => (
                  <li className="flex justify-between items-center py-3 text-sm text-gray-700 font-medium" key={item._id}>
                    <span className="capitalize">{item.name}</span>
                    <span className={`text-xs border px-2 py-0.5 rounded-md ${
                      item.quantity <= 3 
                        ? 'text-red-600 bg-red-50 border-red-100 font-bold' 
                        : 'text-amber-600 bg-amber-50 border-amber-100'
                    }`}>
                      {item.quantity} left
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[240px]">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Suppliers</h3>
            <ul className="divide-y divide-gray-100 overflow-y-auto flex-1 pr-1">
              {suppliers.length === 0 ? (
                <li className="py-3 text-sm text-gray-400 italic">No registered suppliers found in records.</li>
              ) : (
                suppliers.map((supplier) => (
                  <li className="py-3 flex items-center text-sm text-gray-700 font-medium capitalize" key={supplier._id}>
                    <i className="fas fa-building text-gray-400 mr-2.5"></i> {supplier.name}
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>

        <div className="grid grid-cols-5 gap-5">
          
          <div className="bg-white col-span-3 rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[300px]">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Purchase History</h3>
            <ul className="divide-y divide-gray-100 text-sm overflow-y-auto flex-1 pr-1">
              {requests.length === 0 ? (
                <li className="py-3 text-sm text-gray-400 italic">No dynamic order logs found.</li>
              ) : (
                requests.map((request) => {
                  const status = (request.status || 'pending').toLowerCase();
                  return (
                    <li className="py-3 flex justify-between items-center text-gray-700" key={request._id}>
                      <span className="font-mono font-medium text-gray-900 text-xs">
                        PO-{request._id?.substring(0, 6).toUpperCase()}
                      </span>
                      <span className={`text-xs border px-2 py-0.5 rounded-full font-medium capitalize ${
                        status === 'fulfilled' || status === 'approved'
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : status === 'in transit' || status === 'shipping'
                          ? 'bg-blue-50 text-blue-700 border-blue-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {request.status || 'pending'}
                      </span>
                    </li>
                  )
                })
              )}
            </ul>
          </div>

          <div className="bg-white col-span-2 rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[300px]">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Procurement Deficiency Curve
            </h3>
            <div className="flex-1 w-full relative">
              {lowStockItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 italic">
                  <i className="fas fa-shield-alt text-2xl text-green-300 mb-2"></i>
                  <p className="text-xs font-medium text-gray-500">Stock thresholds completely secure</p>
                </div>
              ) : (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProcurementAnalytics;