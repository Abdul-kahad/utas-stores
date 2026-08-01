import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidenav = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const Chevron = ({ menuName }) => (
    <i className={`fas ${activeMenu === menuName ? 'fa-chevron-down' : 'fa-chevron-right'} ml-auto text-xs opacity-60 transition-transform duration-200`}></i>
  );


  const renderMenu = () => {
    switch (user?.role) {
      case 'admin': return admin;
      case 'store_manager': return store_manager;
      case 'procurement': return procurement;
      default: return department_user;
    }
  };


  const admin = (
    <ul className="flex flex-col gap-2 text-lg">
      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/admin" className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt w-6 text-center"></i> Dashboard
        </Link>
      </li>
      
      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('users')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-users-cog w-6 text-center"></i> Manage Users
          <Chevron menuName="users" />
        </button>
        {activeMenu === 'users' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/view/users" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Users</Link>
            <Link to="/dashboard/register/user" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Register new user</Link>
            <Link to="/dashboard/edit/user" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Edit user properties</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('inventory')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-warehouse w-6 text-center"></i> Manage Store
          <Chevron menuName="inventory" />
        </button>
        {activeMenu === 'inventory' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/inventory" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Store Items</Link>
            <Link to="/dashboard/additem" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Add Items</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('receipts')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-file-invoice-dollar w-6 text-center"></i> Manage Receipts
          <Chevron menuName="receipts" />
        </button>
        {activeMenu === 'receipts' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/restock/receipts" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">View Receipts</Link>
            <Link to="/dashboard/receipt/add" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Create Receipt</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/requests" className="flex items-center gap-3">
          <i className="fas fa-clipboard-check w-6 text-center"></i> Request & Approval
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/direct-issue" className="flex items-center gap-3">
          <i className="fas fa-shipping-fast w-6 text-center"></i> Direct Issue
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/issuing" className="flex items-center gap-3">
          <i className="fas fa-dolly w-6 text-center"></i> Issuing System
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('suppliers')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-truck-loading w-6 text-center"></i> Manage Suppliers
          <Chevron menuName="suppliers" />
        </button>
        {activeMenu === 'suppliers' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/supplier" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Supplier Directory</Link>
            <Link to="/dashboard/supplier/add" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Add Supplier</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/notifications" className="flex items-center gap-3">
          <i className="fas fa-bell w-6 text-center"></i> Notifications & Alerts
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/reports" className="flex items-center gap-3">
          <i className="fas fa-chart-pie w-6 text-center"></i> Reporting & Analytics
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/admin/audit-logs" className="flex items-center gap-3">
          <i className="fas fa-history w-6 text-center text-blue-400"></i> System Audit logs
        </Link>
      </li>
    </ul>
  );

  const store_manager = (
    <ul className="flex flex-col gap-2 text-lg">
      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/store_manager" className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt w-6 text-center"></i> Dashboard
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('inventory-sm')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-boxes w-6 text-center"></i> Inventory Management
          <Chevron menuName="inventory-sm" />
        </button>
        {activeMenu === 'inventory-sm' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/inventory" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Manage Items</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/requests" className="flex items-center gap-3">
          <i className="fas fa-clipboard-check w-6 text-center"></i> Request & Approval
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/direct-issue" className="flex items-center gap-3">
          <i className="fas fa-shipping-fast w-6 text-center"></i> Direct Issue
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/issuing" className="flex items-center gap-3">
          <i className="fas fa-dolly w-6 text-center"></i> Issuing System
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/notifications" className="flex items-center gap-3">
          <i className="fas fa-bell w-6 text-center"></i> Notifications & Alerts
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/reports" className="flex items-center gap-3">
          <i className="fas fa-chart-pie w-6 text-center"></i> Reporting & Analytics
        </Link>
      </li>
    </ul>  
  );

  const procurement = (
    <ul className="flex flex-col gap-2 text-lg">
      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/procurement" className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt w-6 text-center"></i> Dashboard
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/additem" className="flex items-center gap-3">
          <i className="fas fa-plus-circle w-6 text-center"></i> Add Items
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('receipts')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-file-invoice-dollar w-6 text-center"></i> Manage Receipts
          <Chevron menuName="receipts" />
        </button>
        {activeMenu === 'receipts' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/restock/receipts" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">View Receipts</Link>
            <Link to="/dashboard/receipt/add" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Create Receipt</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/restocked" className="flex items-center gap-3">
          <i className="fas fa-warehouse w-6 text-center"></i> View Inventory
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <button onClick={() => toggleMenu('suppliers-pro')} className="w-full flex items-center gap-3 text-left">
          <i className="fas fa-truck-loading w-6 text-center"></i> Manage Suppliers
          <Chevron menuName="suppliers-pro" />
        </button>
        {activeMenu === 'suppliers-pro' && (
          <div className="submenu text-sm pl-4 mt-2 border-l-2 border-gray-500 flex flex-col gap-1">
            <Link to="/dashboard/supplier" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Supplier Directory</Link>
            <Link to="/dashboard/supplier/add" className="p-2 hover:bg-[rgba(0,0,0,0.1)] rounded">Add Supplier</Link>
          </div>
        )}
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/notifications" className="flex items-center gap-3">
          <i className="fas fa-bell w-6 text-center"></i> Notifications & Alerts
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/reports" className="flex items-center gap-3">
          <i className="fas fa-chart-pie w-6 text-center"></i> Reporting & Analytics
        </Link>
      </li>
    </ul>
  );

  const department_user = (
    <ul className="flex flex-col gap-2 text-lg">
      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/department_user" className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt w-6 text-center"></i> Dashboard
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/requestItem" className="flex items-center gap-3">
          <i className="fas fa-file-signature w-6 text-center"></i> Request Item(s)
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/myrequests" className="flex items-center gap-3">
          <i className="fas fa-hourglass-half w-6 text-center"></i> Requested Item(s)
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/notifications" className="flex items-center gap-3">
          <i className="fas fa-bell w-6 text-center"></i> Notifications & Alerts
        </Link>
      </li>

      <li className="hover:bg-[rgba(0,0,0,0.2)] rounded p-2">
        <Link to="/dashboard/reports" className="flex items-center gap-3">
          <i className="fas fa-chart-pie w-6 text-center"></i> Reporting & Analytics
        </Link>
      </li>
    </ul>
  );

  return (
    <aside className="min-w-[20%] min-h-screen bg-[#0F172A] text-white shadow-lg">
      <div className="flex items-center gap-2 text-xl font-bold p-5 border-b border-gray-700 tracking-wide">
        <img src="pwa-192x192.png" alt="logo" className="w-[35px]"/>
        <Link to={'/'} className="hover:text-blue-400 transition-colors">UTAS STORE</Link>
      </div>
      <div className="p-5 overflow-x-hidden overflow-y-auto h-[calc(100vh-5rem)]">
        {renderMenu()}
      </div>
    </aside>
  );
};

export default Sidenav;