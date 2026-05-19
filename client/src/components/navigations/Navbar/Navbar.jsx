import { Link } from "react-router-dom"
import { useAuth } from "../../../context/authContext"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex justify-around p-5 font-[600] bg-green-700 text-white items-center">
      <div className="logo">UTAS STORE</div>
      <div className="navitems">
        <ul className="flex gap-10 items-center">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/features'}>Features</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          {user ? (
            <li>
              <button className="border border-white p-2 hover:bg-white hover:text-gray-700 rounded-md" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            </li>
          ) : (
            <>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/login'}><button className="bg-blue-500 px-3 py-2 rounded-md">Register</button></Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar