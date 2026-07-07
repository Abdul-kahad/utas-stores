import Navbar from "../../components/navigations/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

const Layout = (props) => {
  return (
    <div>
      <Navbar />
       {props.children}
      <Footer />
    </div>
  )
}

export default Layout