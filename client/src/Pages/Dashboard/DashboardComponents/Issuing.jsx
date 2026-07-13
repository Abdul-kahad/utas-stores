import { useEffect, useState } from "react"
import {getRequests} from '../../../services/requestService'
import Spinner from "../../../components/Spinner/Spinner"

const Issuing = () => {
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "border text-yellow-500 border-yellow-500"
      case "approved":
        return "border text-green-500 border-green-500"
      case "rejected":
        return "border text-red-500 border-red-500"
      default:
        return "border text-gray-500 border-gray-500"
    }
  }
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
          useEffect(() => {
            const fetchRequests = async () => {
              try {
                  // setLoading(true)
                  const results = await getRequests()
                  if (results) setRequests(results)
                } catch (error) {
                  console.error("Error fetching suppliers:", error)
                } finally {
                  setLoading(false)
                }
            }
            fetchRequests()
          },[])
          // console.log(requests)
  return (
    <div className="issuing p-2">
       <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Issuing System</h2>
        </div>
      {loading ? (
          <span className="mt-20 w-full flex justify-center">
            <Spinner size='xxxl'/>
          </span>
        ) : !requests || requests.length < 1 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No Issued item in the database yet.
          </div>
        ) : 
     <div className="overflow-y-auto h-[calc(100vh-12rem)] bg-white border border-gray-200 rounded-xl shadow-sm">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <tr>
            <th className="px-5 py-4">Requested Item(s)</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Unit</th>
            <th className="px-5 py-4">Quantity</th>
            <th className="px-5 py-4">Requested By</th>
            <th className="px-5 py-4">Approved By</th>
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
          {requests.map((request) => {
            let statusStyles = "bg-gray-50 text-gray-700 border-gray-200";
            const currentStatus = request.status?.toLowerCase();
            if (currentStatus === 'approved' || currentStatus === 'issued') {
              statusStyles = "bg-green-50 text-green-700 border-green-200";
            } else if (currentStatus === 'pending') {
              statusStyles = "bg-amber-50 text-amber-700 border-amber-200";
            } else if (currentStatus === 'rejected') {
              statusStyles = "bg-red-50 text-red-700 border-red-200";
            }

            return (
              <tr 
                key={request._id} 
                className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
              >
                <td className="px-5 py-4 font-medium text-gray-900">
                  {request.items[0]?.item?.name || 'N/A'}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {request.items[0]?.item?.category || 'N/A'}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {request.items[0]?.item?.unit || 'N/A'}
                </td>
                <td className="px-5 py-4 text-gray-500 font-medium">
                  {request.items[0]?.quantity || 0}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {request.user?.name || 'N/A'}
                </td>
                <td className="px-5 py-4 text-gray-500 italic">
                  {request.approvedBy?.name || 'N/A'}
                </td>
                <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                  {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${statusStyles}`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>}
    </div>
  )
}

export default Issuing