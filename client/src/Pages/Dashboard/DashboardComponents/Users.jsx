import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/userServices"
import Spinner from "../../../components/Spinner/Spinner"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchUsers = async () => {
         try {
            // setLoading(true)
            const results = await getAllUsers()
            if (results) setUsers(results.users)
          } catch (error) {
            console.error("Error fetching users:", error)
          } finally {
            setLoading(false)
          }
      }
      fetchUsers()
    },[])
  return (
    <div className="users p-2">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Registered System Users</h2>
        </div>
      {loading ? (
          <span className="mt-20 w-full flex justify-center">
            <Spinner size='xxxl'/>
          </span>
        ) : !users || users.length < 1 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No Users registered in the database yet.
          </div>
        ) :  
      <div className="overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-sm h-[calc(100vh-12rem)]">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {users.map((user) => (
              <tr 
                key={user._id} 
                className="hover:bg-gray-50/70 transition-colors duration-150 odd:bg-white even:bg-gray-50/30"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    user.role === 'admin' 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  )
}

export default Users