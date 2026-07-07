import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import RegisterUser from "../Auth/RegisterUser";
import Additem from "./DashboardComponents/Additem"
import AdminAnalytics from "./DashboardComponents/AdminAnalytics"
import DepartmentRequests from "./DashboardComponents/DepartmentRequests"
import Inventory from "./DashboardComponents/Inventory"
import Issuing from "./DashboardComponents/Issuing"
import Notifications from "./DashboardComponents/Notifications"
import RestockReceipts from "./DashboardComponents/RestockReceipts"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import RequestItem from "./DashboardComponents/RequestItem"
import Requests from "./DashboardComponents/Requests"
import Restocked from "./DashboardComponents/Restoked"
import Suppliers from "./DashboardComponents/Suppliers"
import Users from "./DashboardComponents/Users"
import Receipt from "./DashboardComponents/Receipt"

import { Routes, Route,useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import AddSupplier from "./DashboardComponents/AddSupplier";

const AdminDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1 h-screen">
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
          <Route path="/dashboard/admin" element={<AdminAnalytics />}/>
          <Route path="/dashboard/view/users" element={<Users />}/>
          <Route path="/dashboard/register/user" element={<RegisterUser />}/>
          <Route path="/dashboard/inventory" element={<Inventory />}/>
          <Route path="/dashboard/additem" element={<Additem />}/> 
          <Route path="/dashboard/requests" element={<Requests />}/>
          <Route path="/dashboard/issuing" element={<Issuing />}/>
          <Route path="/dashboard/supplier" element={<Suppliers />}/>
          <Route path="/dashboard/supplier/add" element={<AddSupplier />}/>
          <Route path="/dashboard/restocked" element={<Restocked />}/>
          <Route path="/dashboard/receipt/add" element={<Receipt />}/>
          <Route path="/dashboard/restock/receipts" element={<RestockReceipts />}/>
          <Route path="/dashboard/notifications" element={<Notifications />}/>
          <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
          <Route path="/dashboard/requestItem" element={<RequestItem />}/>
          <Route path="/dashboard/myrequests" element={<DepartmentRequests />}/>
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard