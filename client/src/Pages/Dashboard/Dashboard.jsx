import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import Additem from "./DashboardComponents/Additem"
import Adminview from "./DashboardComponents/Adminview"
import DepartmentRequests from "./DashboardComponents/DepartmentRequests"
import Inventory from "./DashboardComponents/Inventory"
import Issuing from "./DashboardComponents/Issuing"
import Notifications from "./DashboardComponents/Notifications"
import Purchasehistory from "./DashboardComponents/Purchasehistory"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"
import RequestItem from "./DashboardComponents/RequestItem"
import Requests from "./DashboardComponents/Requests"
import Restocked from "./DashboardComponents/Restoked"
import Suppliers from "./DashboardComponents/Suppliers"
import Users from "./DashboardComponents/Users"

import { Routes, Route } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1 h-dvh overflow-y-scroll scrollbar-hide">
        <div className="p-5 bg-gray-100 flex text-xl justify-between">
          <h3 className="font-bold">Dashboard</h3>
          <div className="flex gap-5">
            <p><i className="fas fa-bell"></i></p>
            <p>Department</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Adminview />}/>
          <Route path="/dashboard/view/users" element={<Users />}/>
          <Route path="/dashboard/inventory" element={<Inventory />}/>
          <Route path="/dashboard/additem" element={<Additem />}/>
          <Route path="/dashboard/requests" element={<Requests />}/>
          <Route path="/dashboard/issuing" element={<Issuing />}/>
          <Route path="/dashboard/supplier" element={<Suppliers />}/>
          <Route path="/dashboard/restocked" element={<Restocked />}/>
          <Route path="/dashboard/purchase/history" element={<Purchasehistory />}/>
          <Route path="/dashboard/notifications" element={<Notifications />}/>
          <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
          <Route path="/dashboard/requestItem" element={<RequestItem />}/>
          <Route path="/dashboard/myrequests" element={<DepartmentRequests />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard