import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import ProcurementAnalytics from "./DashboardComponents/ProcurementAnalytics"
import Additem from "./DashboardComponents/Additem"
import Notifications from "./DashboardComponents/Notifications"
import Purchasehistory from "./DashboardComponents/Purchasehistory"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import Restocked from "./DashboardComponents/Restoked"
import Suppliers from "./DashboardComponents/Suppliers"

import { Routes, Route } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1 h-dvh overflow-y-scroll scrollbar-hide">
        <div className="p-5 bg-gray-100 flex text-xl justify-between">
          <h3 className="font-bold">Procurement Dashboard</h3>
          <div className="flex gap-5">
            <p><i className="fas fa-bell"></i></p>
            <p>Department</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<ProcurementAnalytics />}/>
          <Route path="/dashboard/additem" element={<Additem />}/>
          <Route path="/dashboard/supplier" element={<Suppliers />}/>
          <Route path="/dashboard/restocked" element={<Restocked />}/>
          <Route path="/dashboard/purchase/history" element={<Purchasehistory />}/>
          <Route path="/dashboard/notifications" element={<Notifications />}/>
          <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard