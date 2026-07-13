import { useState } from "react"
import { register } from '../../services/authService'
import Spinner from "../../components/Spinner/Spinner"
import Backdrop from "../../HOC/Backdrop/Backdrop"

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  })
  const [serverMsg, setServerMsg] = useState('')  
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleOpenConfirmation = (e) => {
    e.preventDefault() 
    setErrorMsg('')
    setServerMsg('')

    if (!formData.name.trim()) return setErrorMsg("Name field is required.")
    if (!formData.email.trim()) return setErrorMsg("Email field is required.")
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return setErrorMsg("Please enter a valid email address.")
    
    if (!formData.role) return setErrorMsg("Please select a user role.")
    if (!formData.password || formData.password.length < 6) {
      return setErrorMsg("Password must be at least 6 characters long.")
    }

    setShowModal(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setShowModal(false)
    setErrorMsg('')
    
    try {
      const response = await register(formData)
      setServerMsg(response?.message || "User account created successfully!")
      
      setFormData({
        name: '',
        email: '',
        role: '',
        password: ''
      })
    } catch (error) {
      console.error("Registration error:", error)
      setErrorMsg(error?.response?.data?.message || "Failed to register user. System timeout.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-start p-4">
      {showModal && (
        <Backdrop 
          title="Register New User?" 
          action={`Are you sure you want to grant system access to ${formData.email}?`} 
          confirm={handleSubmit} 
          cancel={() => setShowModal(false)}
        />
      )}

      <div className="flex flex-col p-8 bg-white w-full max-w-[650px] mt-15 rounded-xl shadow-xl border border-gray-100">
        <h2 className="text-2xl text-center font-bold text-gray-700 mb-8">Register a New User</h2>
        
        {serverMsg && (
          <p className="text-green-600 bg-green-50 border border-green-100 text-sm font-medium py-2.5 px-3 rounded-lg mb-5 text-center flex items-center justify-center gap-2">
            <i className="fas fa-check-circle"></i> {serverMsg}
          </p>
        )}

        {errorMsg && (
          <p className="text-red-600 bg-red-50 border border-red-100 text-sm font-medium py-2.5 px-3 rounded-lg mb-5 text-center flex items-center justify-center gap-2">
            <i className="fas fa-exclamation-triangle"></i> {errorMsg}
          </p>
        )}

        <form onSubmit={handleOpenConfirmation} className="flex flex-col">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold text-gray-600 text-sm mb-1">Full Name</label>
              <input 
                className="p-2.5 border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-600 outline-none transition-all rounded-lg text-sm disabled:bg-gray-50" 
                type="text" 
                id="name" 
                placeholder="eg. Department name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                value={formData.name}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-gray-600 text-sm mb-1">Email Address</label>
              <input 
                className="p-2.5 border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-600 outline-none transition-all rounded-lg text-sm disabled:bg-gray-50" 
                type="email" 
                id="email" 
                placeholder="eg. department email"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                value={formData.email}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="role" className="font-semibold text-gray-600 text-sm mb-1">System Role</label>
              <select 
                className="p-2.5 border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-600 outline-none transition-all rounded-lg text-sm disabled:bg-gray-50 bg-white" 
                id="role" 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                value={formData.role}
                disabled={loading}
              >
                <option value="">Select Account Role</option>
                <option value="admin">Admin</option>
                <option value="store_manager">Store Manager</option>
                <option value="procurement">Procurement</option>
                <option value="department_user">Department User</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold text-gray-600 text-sm mb-1">Initial Password</label>
              <input 
                className="p-2.5 border border-gray-200 focus:ring-2 focus:ring-gray-500/20 focus:border-gray-600 outline-none transition-all rounded-lg text-sm disabled:bg-gray-50" 
                type="password" 
                id="password" 
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
                disabled={loading}
              />
            </div>

          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`mt-6 p-3 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-800 hover:bg-blue-900 active:transform active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <Spinner size='sm'/>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <i className="fas fa-user-plus text-sm"></i>
                <span>Register User</span>
              </>
            )}
          </button>
        </form>
      </div> 
    </div>
  )
}

export default RegisterUser;