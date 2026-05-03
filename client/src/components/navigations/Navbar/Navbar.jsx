
const Navbar = () => {
  return (
    <div className="flex justify-around p-5 font-[600] bg-green-700 text-white items-center">
      <div className="logo">UTAS STORE</div>
      <div className="navitems">
        <ul className="flex gap-10 items-center">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#"><button className="bg-blue-500 px-3 py-2 rounded-md">Register</button></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar