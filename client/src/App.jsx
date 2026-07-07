import Login from "./Pages/Auth/Login"
import Hompage from "./Pages/Homepage/Hompage"
import AdminDashboard from "./Pages/Dashboard/AdminDashboard"
import StoreDashboard from "./Pages/Dashboard/StoreDashboard"
import ProcurementDashboard from "./Pages/Dashboard/ProcurementDashboard"
import UserDashboard from "./Pages/Dashboard/UserDashboard"
import { Routes, Route } from "react-router-dom"
import { useAuth } from "./context/authContext"

function App() {

  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="box-border">
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          user?.role === 'admin' 
          ? <AdminDashboard /> 
          : user?.role === 'store_manager' 
          ? <StoreDashboard />
          : user?.role === 'procurement'
          ? <ProcurementDashboard />
          : user?.role === 'department_user'
          ? <UserDashboard />
          : <Login />
        } />
      </Routes>
    </div>
  )
}

export default App
