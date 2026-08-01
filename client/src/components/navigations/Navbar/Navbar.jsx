import { Link } from "react-router-dom"
import { useAuth } from "../../../context/authContext"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex justify-between p-5 px-25 font-[600] bg-[#1E3A8A] text-white items-center fixed w-full">
      <div className="flex justify-center items-center gap-2">
        <img src="/pwa-192x192.png" alt="logo" className="w-[35px]"/>
        <p className="logo text-xl font-bold">UTAS STORE</p>
      </div>
      <div className="navitems">
        <ul className="flex gap-10 items-center">
          {/* <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/features'}>Features</Link></li>
          <li><Link to={'/about'}>About</Link></li> */}
          {user ? (
            <li>
              <button className="border border-white p-2 bg-white text-[#1E3A8A] hover:bg-transparent hover:text-white rounded-md" onClick={() => navigate('/dashboard/admin')}>
                Dashboard
              </button>
            </li>
          ) : (
            <>
              <li className="border border-white px-5 py-2 hover:bg-white hover:text-[#1E3A8A] bg-transparent text-white rounded-md">
                <Link to={'/login'}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar