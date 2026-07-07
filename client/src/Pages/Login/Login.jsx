import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { register, userlogin } from '../../services/authService'

const Login = () => {
  const { login } = useAuth()
  const [haveacc, setHaveacc] = useState(true)
  const [formData, setFormData] = useState({})
  const [serverMsg, setServerMsg] = useState('')  
  const toggle = () => {
    setHaveacc( prevState => !prevState )
  }
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (haveacc) {
     const result = await userlogin(formData)
     localStorage.setItem('accessToken', result.accessToken)
     localStorage.setItem('user', JSON.stringify(result.user))

     setServerMsg(result.message)
     if(result.success){
      navigate('/')
     }
     if (result.success) {
      login(result.user) 
    }
    } else {
      const message = await register(formData)
      setServerMsg(message)
      navigate('/login')
    }
  }

  return (
    <div className="flex" >
        <div className="auth w-[25%]">
          {!haveacc ? <div className="flex flex-col p-10 h-screen bg-white justify-center ">
            <h2 className="text-xl text-center font-[600] mb-5">Register an account</h2>
            {serverMsg && <p className="text-green-500 text-sm mb-4 text-center">{serverMsg}</p>}
            <label htmlFor="name">Name</label>
            <input 
              className="mb-5 p-2 bg-gray-100 rounded" 
              type="text" id="name" 
              placeholder="Enter Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              value={formData.name || ''}/>

            <label htmlFor="email">Email</label>
            <input 
              className="mb-5 p-2 bg-gray-100 rounded" 
              type="text" id="email" 
              placeholder="Enter Email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              value={formData.email || ''}/>

            <label htmlFor="password">Password</label>
            <input 
              className="mb-5 p-2 bg-gray-100 rounded" 
              type="text" id="password" 
              placeholder="Enter Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              value={formData.password || ''}/>

            {/* <label htmlFor="cpass">Confirm Password</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="cpass" placeholder="Repeat Password"/> */}

            <button className="bg-green-700 p-2 text-white rounded" onClick={handleSubmit}>Create Account</button>
            <Link className="text-red-500 text-sm mt-2 text-center" to="/login" onClick={toggle}>Already have an account? Login</Link>
          </div> 
        : 
          <form className="flex flex-col p-10 h-screen bg-white justify-center ">
            <h2 className="text-2xl text-center font-[600] mb-5">Welcome back</h2>
            {serverMsg && <p className="text-red-500 text-sm mb-4 text-center">{serverMsg}</p>}
            <label htmlFor="email">Email</label>
            <input 
              className="mb-5 p-2 bg-gray-100 rounded" 
              type="text" id="email" 
              placeholder="Enter Email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              value={formData.email || ''}/>

            <label htmlFor="password">Password</label>
            <input 
              className="mb-5 p-2 bg-gray-100 rounded" 
              type="text" id="password" 
              placeholder="Enter Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              value={formData.password || ''}/>

            <button className="bg-green-700 p-2 text-white rounded" onClick={handleSubmit}>Login</button>
            <Link className="text-red-500 text-sm mt-2 text-center" href="/register" onClick={toggle}>Dont have an account? Register</Link>
          </form>}

      </div>
      <div className="bg-green-500 flex-1"></div>
    </div>
  )
}

export default Login