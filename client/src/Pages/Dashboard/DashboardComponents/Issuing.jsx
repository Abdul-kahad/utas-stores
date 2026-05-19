import { useEffect, useState } from "react"
import {getRequests} from '../../../services/requestService'

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
  const [requests, setRequests] = useState([])
          useEffect(() => {
            const fetchRequests = async () => {
              const results = await getRequests()
              setRequests(results)
            }
            fetchRequests()
          },[])
          console.log(requests)
  return (
    <div className="inventory p-5">
      <table className="table-auto w-full text-left ">
        <thead className="text-sm">
          <tr>
            <th className="rounded p-4">Requested Item(s)</th>
            <th className="rounded p-4">Category</th>
            <th className="rounded p-4">Unit</th>
            <th className="rounded p-4">Quantity</th>
            <th className="rounded p-4">Requested By</th>
            <th className="rounded p-4">Approve  By</th>
            <th className="rounded p-4">Date</th>
            <th className="rounded p-4">Status</th>
          </tr>
        </thead>
        <tbody >
          {requests.map(request => (
            <tr className="rounded bg-gray-100 border-b border-gray-200" key={request._id}>
              <td className="p-4">{request.items[0]?.item.name || 'N/A'}</td>
              <td className="p-4">{request.items[0]?.item.category || 'N/A'}</td>
              <td className="p-4">{request.items[0]?.item.unit || 'N/A'}</td>
              <td className="p-4">{request.items[0]?.quantity || 0}</td>
              <td className="p-4">{request.user?.name || 'N/A'}</td>
              <td className="p-4">{request.approvedBy || 'N/A'}</td>            
              <td className="p-4">{new Date(request.createdAt).toLocaleDateString()}</td>
              <td className="p-4"><span className={`px-2 pb-1 rounded-3xl ${statusColor(request.status)}`}>{request.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Issuing