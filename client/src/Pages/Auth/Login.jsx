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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerMsg('')
    setLoading(true)

    try {
      const result = await userlogin(formData)

      if (result && result.success) {
        localStorage.setItem('accessToken', result.accessToken)
        localStorage.setItem('user', JSON.stringify(result.user))
        
        setServerMsg(result.message || 'Login successful!')
        login(result.user) 
        navigate(`/dashboard/${result.user.role}`)
      } else {
        setServerMsg(result?.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error("Login component error:", error)
      const errorMsg = error.response?.data?.message || 'Invalid email or password.'
      setServerMsg(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
    
    <div 
      className="absolute inset-0 bg-[url('/images.png')] bg-cover bg-center bg-no-repeat backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: 0.04 }}
    />

    <div className="w-[40%] z-10">
      <form onSubmit={handleSubmit} className="flex flex-col p-10 bg-white justify-center rounded-xl shadow-md border border-gray-200">
        <span className="w-full flex justify-center">
          <img src="/pwa-192x192.png" alt="logo" className="w-35" />
        </span>
        <h2 className="text-2xl text-center text-gray-600 mb-5">Welcome back</h2>

        {serverMsg && (
          <p className={`text-sm mb-4 text-center ${serverMsg.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
            {serverMsg}
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input 
          className="mb-5 p-2 bg-gray-100 rounded border border-gray-200" 
          type="text" 
          id="email" 
          placeholder="Enter Email"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          value={formData.email || ''}
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          className="mb-5 p-2 bg-gray-100 rounded border border-gray-200" 
          type="password" 
          id="password" 
          placeholder="Enter Password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          value={formData.password || ''}
          required
        />

        <button 
          type="submit" 
          className="bg-green-700 hover:bg-green-800 transition-colors p-2 text-white rounded font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size='sm'/>
              <p>Logging in...</p>
            </span>
          ) : (
            <p>Login</p>
          )}
        </button>
        
        <Link className="text-gray-500 hover:text-gray-700 text-sm mt-4 text-center block" to="/forgetpassword">
          Forget password?
        </Link>
      </form>
    </div>
  </div>
)
}

export default Login