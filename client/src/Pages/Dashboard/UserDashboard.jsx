import Sidenav from "../../components/navigations/Sidenav/Sidenav"
import UserAnalytics from "./DashboardComponents/UserAnalytics"
import RequestItem from "./DashboardComponents/RequestItem"
import DepartmentRequests from "./DashboardComponents/DepartmentRequests"
import Notifications from "./DashboardComponents/Notifications"
import ReportingAnalytics from "./DashboardComponents/ReportingAnalytics"

import { Routes, Route } from "react-router-dom"

const UserDashboard = () => {
  return (
    <div className="flex ">
     <Sidenav />
      <div className="main flex-1 h-dvh overflow-y-scroll scrollbar-hide">
        <div className="p-5 bg-gray-100 flex text-xl justify-between">
          <h3 className="font-bold">User Dashboard</h3>
          <div className="flex gap-5">
            <p><i className="fas fa-bell"></i></p>
            <p>Department</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<UserAnalytics />}/>
          <Route path="/dashboard/requestItem" element={<RequestItem />}/>
          <Route path="/dashboard/myrequests" element={<DepartmentRequests />}/>
          <Route path="/dashboard/notifications" element={<Notifications />}/>
          <Route path="/dashboard/reports" element={<ReportingAnalytics />}/>
        </Routes>
      </div>
    </div>
  )
}

export default UserDashboard