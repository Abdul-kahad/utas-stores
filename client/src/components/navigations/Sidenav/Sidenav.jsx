import { useState } from "react"
import { Link } from "react-router-dom"

const Sidenav = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggle = () => {
    setShowMenu(prevState => !prevState)
  }
 
  const admin = <ul className="flex flex-col gap-5 text-lg">
                  <li><Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                  <li><Link to="/dashboard/dashboard/view/users"> <i className="fas fa-users"></i> Users</Link></li>
                  <li>
                    <p onClick={toggle}><i className="fas fa-boxes"></i> Inventory Management</p>
                    {showMenu && <div className="submenu text-sm pl-3 border-l-2 border-gray-300 d-none">
                      <p className="p-1 hover:bg-[rgba(0,0,0,0.2)] rounded"><Link to="/dashboard/dashboard/inventory">Manage Items</Link></p>
                      <p className="p-1 hover:bg-[rgba(0,0,0,0.2)] rounded"><Link to="/dashboard/dashboard/additem">Add Items</Link></p>
                    </div>}
                  </li>
                  <li><Link to="/dashboard/dashboard/requests"> <i className="fas fa-file-alt"></i> Request & Approval</Link></li>
                  <li><Link to="/dashboard/dashboard/issuing"> <i className="fas fa-box-open"></i> Issuing System</Link></li>
                  <li><Link to="/dashboard/dashboard/supplier"> <i className="fas fa-truck"></i> Supplier & Procurement</Link></li>
                  <li><Link to="/dashboard/dashboard/notifications"> <i className="fas fa-bell"></i> Notifications & Alerts</Link></li>
                  <li><Link to="/dashboard/dashboard/purchase/history"> <i className="fas fa-history"></i> Purchase History</Link></li>
                  <li><Link to="/dashboard/dashboard/reports"> <i className="fas fa-chart-bar"></i> Reporting & Analytics</Link></li>
                </ul>
               
  const store_manager = <ul className="flex flex-col gap-5 text-lg">
                          <li>
                            <p onClick={toggle}><i className="fas fa-boxes"></i> Inventory Management</p>
                            {showMenu && <div className="submenu text-sm pl-3 border-l-2 border-gray-300 d-none">
                              <p className="p-1 hover:bg-[rgba(0,0,0,0.2)] rounded"><Link to="/dashboard/dashboard/inventory">Manage Items</Link></p>
                              <p className="p-1 hover:bg-[rgba(0,0,0,0.2)] rounded"><Link to="/dashboard/dashboard/additem">Add Items</Link></p>
                            </div>}
                          </li>
                          <li><Link to="/dashboard/dashboard/requests"> <i className="fas fa-file-alt"></i> Request & Approval</Link></li>
                          <li><Link to="/dashboard/dashboard/issuing"> <i className="fas fa-box-open"></i> Issuing System</Link></li>
                          <li><Link to="/dashboard/dashboard/notifications"> <i className="fas fa-bell"></i> Notifications & Alerts</Link></li>
                          <li><Link to="/dashboard/dashboard/reports"> <i className="fas fa-chart-bar"></i> Reporting & Analytics</Link></li>
                        </ul>  
              
  const procurement = <ul className="flex flex-col gap-5 text-lg">
                        <li><Link to="/dashboard/dashboard/additem"> <i className="fas fa-plus"></i> Add Items</Link></li>
                        <li><Link to="/dashboard/dashboard/restocked"> <i className="fas fa-box"></i> View Inventory</Link></li>
                        <li><Link to="/dashboard/dashboard/supplier"> <i className="fas fa-truck"></i> Supplier & Procurement</Link></li>
                        <li><Link to="/dashboard/dashboard/notifications"> <i className="fas fa-bell"></i> Notifications & Alerts</Link></li>
                        <li><Link to="/dashboard/dashboard/purchase/history"> <i className="fas fa-history"></i> Purchase History</Link></li>
                        <li><Link to="/dashboard/dashboard/reports"> <i className="fas fa-chart-bar"></i> Reporting & Analytics</Link></li>
                      </ul>

  const department_user = <ul className="flex flex-col gap-5 text-lg">
                            <li><Link to="/dashboard/dashboard/requestItem"> <i className="fas fa-file-medical"></i> Request Item(s)</Link></li>
                            <li><Link to="/dashboard/dashboard/myrequests"> <i className="fas fa-inbox"></i> Requested Item(s)</Link></li>
                            <li><Link to="/dashboard/dashboard/notifications"> <i className="fas fa-bell"></i> Notifications & Alerts</Link></li>
                            <li><Link to="/dashboard/dashboard/reports"> <i className="fas fa-chart-bar"></i> Reporting & Analytics</Link></li>
                          </ul>
  return (
    <aside className="w-[20%] bg-gray-700 h-screen text-white">
      <div className="text-xl font-bold p-5 border-b-2"><Link to={'/'}>UTAS STORE</Link></div>
      <div className="p-5">
        {admin}
      </div>
    </aside>
  )
}

export default Sidenav