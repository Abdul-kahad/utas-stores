import { Link } from "react-router-dom"
import { useAuth } from "../../../context/authContext"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex justify-around p-5 font-[600] bg-[#1E3A8A] text-white items-center">
      <div className="logo text-xl">UTAS STORE</div>
      <div className="navitems">
        <ul className="flex gap-10 items-center">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/features'}>Features</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          {user ? (
            <li>
              <button className="border border-white p-2 bg-white text-[#1E3A8A] hover:bg-transparent hover:text-white rounded-md" onClick={() => navigate('/dashboard/admin')}>
                Dashboard
              </button>
            </li>
          ) : (
            <>
              <li><Link to={'/login'}>Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar