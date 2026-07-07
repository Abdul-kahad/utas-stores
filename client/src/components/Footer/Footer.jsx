import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='p-10 bg-gray-900 text-white flex flex-wrap justify-around gap-10'>
      <div className="">
        <div className="mb-4">UTAS STORE</div>
          <ul className="flex flex-col line-height-90 text-gray-400 gap-2">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/features'}>Features</Link></li>
            <li><Link to={'/about'}>About</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
          </ul>

      </div>

      <div className="">
         <div className="mb-4">Contact</div>

            <ul className="flex flex-col text-gray-400 gap-2">
              <li><i className="fas fa-phone"></i> Phone: 0800 000 000</li>
              <li><i className="fas fa-envelope"></i> Email: utasstores@edu.gh</li>
              <li><i className="fas fa-map-marker-alt"></i> Address: dk29263</li>
            </ul>
  
      </div>

      <div className="flex flex-col gap-2 text-gray-400 place-content-center">
        <Link to={'https://abdul-kahad-utas-store.github.com'} target="_blank">
          <i className="fab fa-github"></i> GitHub
        </Link>
        <p>Abdul kahad | UTAS Store @ 2026</p>
      </div>
    </div>
  )
}

export default Footer