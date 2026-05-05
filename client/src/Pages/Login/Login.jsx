import { useState } from "react"

const Login = () => {
  const [haveacc, setHaveacc] = useState(true)

  const toggle = () => {
    setHaveacc( prevState => !prevState )
  }

  return (
    <div className="flex" >
        <div className="auth w-[25%]">
          {!haveacc ? <div className="flex flex-col p-10 h-screen bg-white justify-center ">
            <h2 className="text-xl text-center font-[600] mb-5">Register an account</h2>

            <label htmlFor="name">Name</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="name" placeholder="Enter Name"/>

            <label htmlFor="email">Email</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="email" placeholder="Enter Email"/>

            <label htmlFor="password">Password</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="password" placeholder="Enter Password"/>

            <label htmlFor="cpass">Confirm Password</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="cpass" placeholder="Repeat Password"/>

            <button className="bg-green-700 p-2 text-white rounded">Create Account</button>
            <a className="text-red-500 text-sm mt-2 text-center" href="#" onClick={toggle}>Already have an account? Login</a>
          </div> 
        : 
          <div className="flex flex-col p-10 h-screen bg-white justify-center ">
            <h2 className="text-2xl text-center font-[600] mb-5">Welcome back</h2>

            <label htmlFor="email">Email</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="email" placeholder="Enter Email"/>

            <label htmlFor="password">Password</label>
            <input className="mb-5 p-2 bg-gray-100 rounded" type="text" id="password" placeholder="Enter Password"/>

            <button className="bg-green-700 p-2 text-white rounded">Login</button>
            <a className="text-red-500 text-sm mt-2 text-center" href="#" onClick={toggle}>Dont have an account? Register</a>
          </div>}

      </div>
      <div className="bg-green-500 flex-1"></div>
    </div>
  )
}

export default Login