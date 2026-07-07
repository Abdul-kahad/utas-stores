import { useEffect, useState } from "react"
import {getRequests, approveRequest, rejectRequest} from '../../../services/requestService'
import Spinner from "../../../components/Spinner/Spinner"
import Backdrop from "../../../HOC/Backdrop/Backdrop"

const Requests = () => {
   const [requests, setRequests] = useState([])
   const [showModal, setShowModal] = useState(false)
   const [reqId, setReqId] = useState('')
   const [action, setAction] = useState('')
   const [message, setMessage] = useState('')
   const [loading, setLoading] = useState(true)


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
        },[requests])
  
    const approveRequestHandler = async (requestId) => {
      setShowModal(false)
      const result = await approveRequest(requestId)
      setMessage(result)
      console.log('Approve request result:', result)
    }
  
    const rejectRequestHandler = async (requestId) => {
      setShowModal(false)
      await rejectRequest(requestId)
    }

  return (
    <div className="requests p-5">
      {showModal && action == 'approving' ? <Backdrop title="Approve Request?" action="Are you sure you want to approve this request" confirm={() => approveRequestHandler(reqId)} cancel={() => setShowModal(false)}/> : ''}
      {showModal && action == 'rejecting' ? <Backdrop title="Reject Request?" action="Are you sure you want to reject this request" confirm={() => rejectRequestHandler(reqId)} cancel={() => setShowModal(false)}/> : ''}
      {loading ? (
          <span className="mt-20 w-full flex justify-center">
            <Spinner size='xxxl'/>
          </span>
        ) : !requests || requests.length < 1 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No Requests registered in the database yet.
          </div>
        ) :  
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          {message && <p className="text-red-600 text-center my-1">{message}</p> }
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Requested Item(s)</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {requests.map((request) => {
                let statusStyles = "bg-gray-50 text-gray-700 border-gray-200";
                if (request.status?.toLowerCase() === 'approved' || request.status?.toLowerCase() === 'issued') {
                  statusStyles = "bg-green-50 text-green-700 border-green-200";
                } else if (request.status?.toLowerCase() === 'pending') {
                  statusStyles = "bg-amber-50 text-amber-700 border-amber-200";
                } else if (request.status?.toLowerCase() === 'rejected') {
                  statusStyles = "bg-red-50 text-red-700 border-red-200";
                }

                return (
                  <tr 
                    key={request._id} 
                    className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {request.items[0]?.item?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {request.items[0]?.item?.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {request.items[0]?.item?.unit || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {request.items[0]?.quantity || 0}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {request.user?.name || 'N/A'}
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${statusStyles}`}>
                        {request.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-center whitespace-nowrap"> 
                      <button 
                        className="px-3 py-1 text-xs font-medium bg-white text-green-700 border border-green-300 hover:bg-green-50 rounded-md shadow-sm transition-colors mr-2" 
                        onClick={() => {setShowModal(true); setReqId(request._id); setAction('approving')}}
                      >
                        Approve
                      </button>
                      <button 
                        className="px-3 py-1 text-xs font-medium bg-white text-red-700 border border-red-300 hover:bg-red-50 rounded-md shadow-sm transition-colors" 
                        onClick={() => {setShowModal(true); setReqId(request._id); setAction('rejecting')}}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>  
      }
    </div>
  )
}

export default Requests