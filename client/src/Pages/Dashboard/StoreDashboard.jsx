import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import StoreAnalytics from "./DashboardComponents/StoreAnalytics"
import Inventory from "./DashboardComponents/Inventory"
import Issuing from "./DashboardComponents/Issuing"
import Notifications from "./DashboardComponents/Notifications"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import Requests from "./DashboardComponents/Requests"

import { useAuth } from "../../context/authContext";
import { Routes, Route,useNavigate } from "react-router-dom"
import SearchBar from "../../components/SearchBar/SearchBar";


const StoreDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1">
        <div className="p-4 bg-[#1E3A8A] text-white flex text-xl justify-between items-center">
          <SearchBar />
          <div className="flex gap-5 items-center">
            <p><i className="fas fa-bell"></i></p>
            <button className="border border-white py-2 px-4 text-sm hover:bg-white hover:text-gray-700 rounded-md" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>

        <div className="h-screen overflow-y-auto p-5">
          <Routes>
            <Route path="/dashboard/store_manager" element={<StoreAnalytics />}/>
            <Route path="/dashboard/inventory" element={<Inventory />}/>
            <Route path="/dashboard/requests" element={<Requests />}/>
            <Route path="/dashboard/issuing" element={<Issuing />}/>
            <Route path="/dashboard/notifications" element={<Notifications />}/>
            <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default StoreDashboard