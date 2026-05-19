import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/userServices"

const Users = () => {
  const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchUsers = async () => {
        const results = await getAllUsers()
        setUsers(results.users)
      }
      fetchUsers()
    },[])
  return (
    <div className="users p-5">
      <table className="table-auto w-full text-left">
        <thead className="text-sm">
          <tr>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
          </tr>
        </thead>
        <tbody >
          {users.map(user => (
            <tr className="rounded bg-gray-100 border-b border-gray-200" key={user._id} >
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users