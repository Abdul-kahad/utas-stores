
const Footer = () => {
  return (
    <div className='p-10 bg-gray-900 text-white flex flex-wrap justify-around gap-10'>
      <div className="">
        <div className="mb-4">UTAS STORE</div>
          <ul className="flex flex-col line-height-90 text-gray-400 gap-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Login</a></li>
          </ul>

      </div>

      <div className="">
         <div className="mb-4">Contact</div>

            <ul className="flex flex-col text-gray-400 gap-2">
              <li>Phone: 0800 000 000</li>
              <li>Email: utasstores@edu.gh</li>
              <li>Address: dk29263</li>
            </ul>
  
      </div>

      <div className="flex flex-col gap-2 text-gray-400 place-content-center">
        <a href="#">GitHub: https://abdul-kahad-utas-store.github.com</a>
        <p>Abdul kahad | UTAS Store @ 2026</p>
      </div>
    </div>
  )
}

export default Footer