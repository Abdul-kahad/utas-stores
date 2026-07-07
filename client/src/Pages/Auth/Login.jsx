import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { userlogin } from '../../services/authService'
import Spinner from "../../components/Spinner/Spinner"

const Login = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({})
  const [serverMsg, setServerMsg] = useState('')  
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      const result = await userlogin(formData)
      setLoading(false)

     localStorage.setItem('accessToken', result.accessToken)
     localStorage.setItem('user', JSON.stringify(result.user))

     setServerMsg(result.message)
     if(result.success){
      login(result.user) 
      navigate(`/dashboard/${result.user.role}`)
     }

  }

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="w-[40%]">
          <form className="flex flex-col p-10 bg-white justify-center rounded-xl shadow-md">
            <h2 className="text-4xl text-center font-[600] mb-5">Welcome back</h2>
            {serverMsg && <p className="text-gray-500 text-sm mb-4 text-center">{serverMsg}</p>}
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

            <button className="bg-green-700 p-2 text-white rounded" onClick={handleSubmit}>{loading ? <span className="flex items-center justify-center gap-2"><Spinner size='sm'/><p>Logging in...</p></span> : <p>Login</p>}</button>
            <Link className="text-gray-500 text-sm mt-2 text-center" href="/forgetpassword">Forget password</Link>
          </form>
      </div>
    </div>
  )
}

export default Login