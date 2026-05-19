import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import StoreAnalytics from "./DashboardComponents/StoreAnalytics"
import Inventory from "./DashboardComponents/Inventory"
import Issuing from "./DashboardComponents/Issuing"
import Notifications from "./DashboardComponents/Notifications"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import Requests from "./DashboardComponents/Requests"

import { Routes, Route } from "react-router-dom"

const StoreDashboard = () => {
  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1 h-dvh overflow-y-scroll scrollbar-hide">
        <div className="p-5 bg-gray-100 flex text-xl justify-between">
          <h3 className="font-bold">Store Dashboard</h3>
          <div className="flex gap-5">
            <p><i className="fas fa-bell"></i></p>
            <p>Department</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<StoreAnalytics />}/>
          <Route path="/dashboard/inventory" element={<Inventory />}/>
          <Route path="/dashboard/requests" element={<Requests />}/>
          <Route path="/dashboard/issuing" element={<Issuing />}/>
          <Route path="/dashboard/notifications" element={<Notifications />}/>
          <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
        </Routes>
      </div>
    </div>
  )
}

export default StoreDashboard