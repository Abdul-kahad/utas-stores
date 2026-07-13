import { useEffect, useState } from 'react'
import { getRequests } from '../../../services/requestService'
import { getItems } from '../../../services/itemService'

// Chart.js Core Imports for a Doughnut Chart
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Doughnut Chart Elements
ChartJS.register(ArcElement, Tooltip, Legend);

const StoreAnalytics = () => {
  const [requests, setRequests] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [fetchedRequests, fetchedItems] = await Promise.all([
        getRequests(),
        getItems()
      ])
      
      setRequests(fetchedRequests || [])
      setItems(fetchedItems || [])
    } catch (error) {
      console.error("Error loading store manager analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const totalInventoryCount = items.length
  
  const pendingRequests = requests.filter(
    req => (req.status || 'pending').toLowerCase() === 'pending'
  )
  
  const lowStockItems = items.filter(
    item => item.quantity <= (item.reorderLevel || 10)
  )

  const issuedTodayCount = requests.filter(req => {
    if (req.status !== 'approved' && req.status !== 'issued') return false
    const actionDate = new Date(req.updatedAt || req.createdAt || Date.now()).toDateString()
    const today = new Date('2026-07-01').toDateString() 
    return actionDate === today
  }).length

  // 2. Chart.js Data Computations for Request Status Distribution
  const approvedIssuedCount = requests.filter(req => req.status === 'approved' || req.status === 'issued').length;
  const rejectedCount = requests.filter(req => req.status === 'rejected').length;

  const chartData = {
    labels: ['Pending', 'Approved/Issued', 'Rejected'],
    datasets: [{
      data: [pendingRequests.length, approvedIssuedCount, rejectedCount],
      backgroundColor: [
        '#f59e0b', // Amber-500
        '#10b981', // Emerald-500
        '#ef4444'  // Red-500
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: { size: 11, weight: '500' },
          color: '#4b5563'
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 8,
        displayColors: true,
        boxPadding: 4
      }
    },
    cutout: '72%'
  };

  // Helper to safely parse database timestamps
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="storemanager view">
      <div className="p-5 flex flex-col gap-5">
        
        <div className="flex justify-between items-center p-6 rounded-xl bg-blue-50/60 border border-blue-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back, Store Manager</h2>
          </div>
          {loading && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">Syncing...</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-amber-50 rounded-lg mr-3">
              <i className="fas fa-box text-3xl text-amber-800"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Inventory Items</p>
              <h2 className="text-3xl font-bold text-gray-900">{totalInventoryCount}</h2>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-yellow-50 rounded-lg mr-3">
              <i className="fas fa-file-alt text-3xl text-yellow-600"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
              <h2 className="text-3xl font-bold text-gray-900">{pendingRequests.length}</h2>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-red-50 rounded-lg mr-3">
              <i className="fas fa-level-down-alt text-3xl text-red-500"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Low Stock Alerts</p>
              <h2 className="text-3xl font-bold text-gray-900">{lowStockItems.length}</h2>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-blue-50 rounded-lg mr-3">
              <i className="fas fa-truck text-3xl text-blue-500"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Issued Today</p>
              <h2 className="text-3xl font-bold text-gray-900">{issuedTodayCount}</h2>
            </div>
          </div> 
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className="bg-white lg:col-span-2 overflow-hidden rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Pending Department Requests</h3>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{pendingRequests.length} Waiting</span>
              </div>
              <div className="overflow-y-auto max-h-[300px]">
                <table className="table-auto w-full text-left border-collapse">
                  <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Request ID</th>
                      <th className="px-6 py-3.5">Department Name</th>
                      <th className="px-6 py-3.5">Submission Date</th>
                      <th className="px-6 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    {pendingRequests.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic bg-white">
                          No pending department fulfillment requests queueing.
                        </td>
                      </tr>
                    ) : (
                      pendingRequests.slice(0, 5).map((request) => (
                        <tr key={request._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                          <td className="px-6 py-4 font-mono font-medium text-gray-900 text-xs">
                            {request._id?.substring(0, 8).toUpperCase()}...
                          </td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{request.user?.name || 'Unknown Unit'}</td>
                          <td className="px-6 py-4 text-gray-500 text-xs">{formatDate(request.createdAt)}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 capitalize">
                              {request.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white lg:col-span-1 rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col max-h-[300px]">
            <h2 className='text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3'>Low Stock Alerts</h2>
            <ul className="divide-y divide-gray-100 flex-1 overflow-y-auto pr-1">
              {lowStockItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                  <i className="fas fa-check-circle text-2xl text-green-400 mb-2"></i>
                  <p className="text-xs font-semibold text-gray-500">All Shelves Full</p>
                </div>
              ) : (
                lowStockItems.map((item) => (
                  <li className='flex justify-between items-center py-3 text-sm text-gray-700 font-medium hover:bg-gray-50/50 rounded px-1 transition-colors' key={item._id}>
                    <span className="capitalize text-gray-800">{item.name}</span>
                    <span className={`text-xs font-bold border px-2 py-0.5 rounded-md ${
                      item.quantity <= 3 
                        ? 'text-red-600 bg-red-50 border-red-100 animate-pulse' 
                        : 'text-amber-600 bg-amber-50 border-amber-100'
                    }`}>
                      {item.quantity} left
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col overflow-y-auto h-[300px]">
            <h2 className='text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3'>Recent Inventory Activity</h2>
            <ul className="text-sm text-gray-600 divide-y divide-gray-100 flex-1 overflow-y-auto pr-1">
              {requests.length === 0 ? (
                <li className="py-4 text-center text-xs text-gray-400 italic">No inventory movements logged.</li>
              ) : (
                requests.slice(0, 4).map((req) => {
                  let icon = "fa-arrow-circle-right text-amber-500"
                  let message = `Request submitted by ${req.user?.name || 'Department'}`
                  
                  if (req.status === 'approved' || req.status === 'issued') {
                    icon = "fa-check-circle text-green-500"
                    message = `Dispatched ${req.items?.[0]?.item?.name || 'stock bundle'} to ${req.user?.name || 'Unit'}`
                  } else if (req.status === 'rejected') {
                    icon = "fa-times-circle text-red-500"
                    message = `Fulfillment for ${req.user?.name || 'Department'} declined`
                  }

                  return (
                    <li key={req._id} className='py-3 flex items-center justify-between gap-2 hover:bg-gray-50/30 px-1 rounded transition-colors'>
                      <div className="flex items-center min-w-0">
                        <i className={`fas ${icon} mr-2.5 flex-shrink-0`}></i>
                        <span className="truncate text-gray-600 font-medium text-xs">{message}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 flex-shrink-0">{formatDate(req.updatedAt || req.createdAt)}</span>
                    </li>
                  )
                })
              )}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col overflow-y-auto h-[300px]">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Fulfillment Status Distribution
            </h3>
            <div className="flex-1 w-full relative">
              {requests.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 italic">
                  No tracking data available
                </div>
              ) : (
                <Doughnut data={chartData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StoreAnalytics;