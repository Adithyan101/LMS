import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="bg-zinc-900 h-screen ">
        <Navbar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout