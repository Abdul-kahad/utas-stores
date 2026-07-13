import { useEffect, useState } from 'react'
import { getRequests } from '../../../services/requestService'
import { useNavigate } from 'react-router-dom';

// Chart.js Core Imports for Pie Chart
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart Components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserAnalytics = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchUserRequests = async () => {
    try {
      setLoading(true)
      const results = await getRequests()
      setRequests(Array.isArray(results) ? results : [])
    } catch (error) {
      console.error("Error loading personal request analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserRequests()
  }, [])

  const totalRequests = requests.length
  const pendingRequests = requests.filter(r => (r.status || 'pending').toLowerCase() === 'pending').length
  const approvedRequests = requests.filter(r => ['approved', 'fulfilled'].includes((r.status || '').toLowerCase())).length
  const rejectedRequests = requests.filter(r => (r.status || '').toLowerCase() === 'rejected').length

  const activeUserName = requests[0]?.user?.name || 'User'

  // Chart.js Configurations mapping request outcomes
  const chartData = {
    labels: ['Pending', 'Approved/Fulfilled', 'Rejected'],
    datasets: [{
      data: [pendingRequests, approvedRequests, rejectedRequests],
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
          font: { size: 12, weight: '500' },
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
    }
  };

  return (
    <div className="admin view">
      <div className="p-5 flex flex-col gap-5">
        
        {/* Welcome Banner Row */}
        <div className="flex justify-between items-center p-6 rounded-xl bg-blue-50/60 border border-blue-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {activeUserName}</h2>
          </div>
          {loading && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">
              Syncing...
            </span>
          )}
        </div>

        <div className="grid gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-gray-50 rounded-lg mr-3">
                <i className="fas fa-file-invoice text-2xl text-gray-600"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">My Requests</p>
                <h2 className="text-3xl font-bold text-gray-900">{totalRequests}</h2>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-amber-50 rounded-lg mr-3">
                <i className="fas fa-hourglass-half text-2xl text-amber-600"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <h2 className="text-3xl font-bold text-gray-900">{pendingRequests}</h2>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-green-50 rounded-lg mr-3">
                <i className="fas fa-check-circle text-2xl text-green-600"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <h2 className="text-3xl font-bold text-gray-900">{approvedRequests}</h2>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-red-50 rounded-lg mr-3">
                <i className="fas fa-times-circle text-2xl text-red-500"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Rejected</p>
                <h2 className="text-3xl font-bold text-gray-900">{rejectedRequests}</h2>
              </div>
            </div>  

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          <div 
            onClick={() => navigate('/dashboard/requestItem')}  
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-center group cursor-pointer hover:border-blue-300 transition-all duration-200 h-[250px]"
          >
            <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xl"></i>
            </div>
            <h3 className="text-base font-semibold text-gray-800">Request Item</h3>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[250px]">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">My Recent Requests</h3>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="table-auto w-full text-left border-collapse min-w-[400px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-2.5">Request ID</th>
                    <th className="px-5 py-2.5">Date</th>
                    <th className="px-5 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-5 py-6 text-center text-gray-400 italic">
                        You haven't submitted any requests yet.
                      </td>
                    </tr>
                  ) : (
                    requests.slice(0, 4).map((request) => {
                      const currentStatus = (request.status || 'pending').toLowerCase();
                      return (
                        <tr className="hover:bg-gray-50/40 transition-colors" key={request._id}>
                          <td className="px-5 py-3 font-mono font-medium text-gray-900">
                            REQ-{request._id?.substring(0, 8).toUpperCase()}
                          </td>
                          <td className="px-5 py-3 text-gray-500">
                            {request.createdAt ? new Date(request.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border ${
                              currentStatus === 'approved' || currentStatus === 'fulfilled'
                                ? 'bg-green-50 text-green-700 border-green-100'
                                : currentStatus === 'rejected'
                                ? 'bg-red-50 text-red-700 border-red-100'
                                : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {request.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col h-[280px]">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Request Fulfillment Rate
          </h3>
          <div className="flex-1 w-full relative">
            {requests.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 italic text-xs">
                No request metrics recorded to chart yet
              </div>
            ) : (
              <Pie data={chartData} options={chartOptions} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserAnalytics;