import { Link } from "react-router-dom"

const CTA = () => {
  return (
    <div className='p-20 bg-gray-100 text-center'>
      <h2 className="text-4xl font-bold text-gray-600">Start managing your store efficiently today.</h2>
      <button className="border-2 border-blue-500 bg-blue-500 px-10 py-2 rounded-md text-white shadow-md mt-4"><Link to={'/login'}><i className="fas fa-arrow-right"></i> Get Started</Link></button>
    </div>
  )
}

export default CTA