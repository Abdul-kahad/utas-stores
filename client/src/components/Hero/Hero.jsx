import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="flex gap-2 p-20 items-center justify-between bg-gray-100 h-screen  ">
      <div className="">
        <h1 className="text-6xl font-bold">UTAS Store Management System</h1>
        <p className="text-lg py-5">Manage inventory, track requests, and streamline your organization's supply system in real time.</p>
        <button className="border-2 border-blue-500 bg-blue-500 px-3 py-2 rounded-md text-white shadow-md mr-4"><Link to={'/dashboard'}>Get Started</Link></button>
        <button className="border-2 border-blue-500 px-3 py-2 rounded-md text-blue-500">View Demo</button>
      </div>
      <div className=" shadow-lg rounded-lg">
        <img className="object-cover rounded-lg" src="dashboard.jpg" alt="dashboard" />
      </div>
    </div>
  )
}

export default Hero