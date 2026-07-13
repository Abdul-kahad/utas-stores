import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import ProcurementAnalytics from "./DashboardComponents/ProcurementAnalytics"
import Additem from "./DashboardComponents/Additem"
import Notifications from "./DashboardComponents/Notifications"
import RestockReceipts from "./DashboardComponents/RestockReceipts"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import Restocked from "./DashboardComponents/Restoked"
import Suppliers from "./DashboardComponents/Suppliers"
import Receipt from "./DashboardComponents/Receipt"


import { useAuth } from "../../context/authContext";
import { Routes, Route ,useNavigate} from "react-router-dom"
import SearchBar from "../../components/SearchBar/SearchBar";
import AddSupplier from "./DashboardComponents/AddSupplier";


const ProcurementDashboard = () => {
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
        <div className="h-[calc(100vh-70px)] p-5 overflow-y-auto">
          <Routes>
            <Route path="/dashboard/procurement" element={<ProcurementAnalytics />}/>
            <Route path="/dashboard/additem" element={<Additem />}/>
            <Route path="/dashboard/supplier" element={<Suppliers />}/>
            <Route path="/dashboard/supplier/add" element={<AddSupplier />}/>
            <Route path="/dashboard/restocked" element={<Restocked />}/>
            <Route path="/dashboard/receipt/add" element={<Receipt />}/>
            <Route path="/dashboard/restock/receipts" element={<RestockReceipts />}/>
            <Route path="/dashboard/notifications" element={<Notifications />}/>
            <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default ProcurementDashboard