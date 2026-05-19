import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../services/userServices'
import { getRequests } from '../../../services/requestService'

const AdminAnalytics = () => {
  const [users, setUsers] = useState([])
  const [requests, setRequests] = useState([])
  const [approve, setApprove] = useState([])
  const [rejects, setRejects] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      const results = await getAllUsers()
      setUsers(results.users.map(user => user._id))
    }
    fetchUsers()

    const fetchRequests = async () => {
      const results = await getRequests()
      setRequests(results.map(request => request._id))
      setApprove(results.filter(request => request.status === 'approved').map(request => request._id))
      setRejects(results.filter(request => request.status === 'rejected').map(request => request._id))
    }
    fetchRequests()
  },[])

  return (
    <div className="admin view">
      <div className="p-5 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center p-5 bg-blue-200 rounded">
              <div className="icon h-[3.5rem] w-[3.5rem] bg-white rounded mr-2"></div>
              <div className="">
                <p className="">Total Users</p>
                <h2 className="text-2xl font-bold">{users.length}</h2>
              </div>
            </div>
            <div className="flex items-center p-5 bg-blue-200 rounded">
              <div className="icon h-[3.5rem] w-[3.5rem] bg-white rounded mr-2"></div>
              <div className="">
                <p className="">Total Requests</p>
                <h2 className="text-2xl font-bold">{requests.length}</h2>
              </div>
            </div>
            <div className="flex items-center p-5 bg-blue-200 rounded">
              <div className="icon h-[3.5rem] w-[3.5rem] bg-white rounded mr-2"></div>
              <div className="">
                <p className="">Approved</p>
                <h2 className="text-2xl font-bold">{approve.length}</h2>
              </div>
            </div>
            <div className="flex items-center p-5 bg-blue-200 rounded">
              <div className="icon h-[3.5rem] w-[3.5rem] bg-white rounded mr-2"></div>
              <div className="">
                <p className="">Rejected</p>
                <h2 className="text-2xl font-bold">{rejects.length}</h2>
              </div>
            </div>  
          </div>
          <div className="bg-blue-200 p-2 rounded">2</div>
        </div>

        <div className="grid grid-cols-5 gap-5">
          <div className="h-[250px] bg-gray-200 col-span-3 rounded">1</div>
          <div className="h-[250px] bg-gray-200 col-span-2 rounded">2</div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div className="h-[200px] bg-gray-200 col-span-5 rounded">1</div>
          <div className="h-[200px] bg-gray-200 col-span-3 rounded">2</div>
          <div className="h-[200px] bg-gray-200 col-span-4 rounded">3</div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics