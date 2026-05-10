import Login from "./Pages/Login/Login"
import Hompage from "./Pages/Homepage/Hompage"
import Dashboard from "./Pages/Dashboard/Dashboard"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="box-border">
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
