import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'
import TotalProgress from "../totalProgress/TotalProgress"
//import { useNavigate } from "react-router-dom";

export function Home() {
  const {loading} = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  
  return ( 
    <div>
      <Navbar />
      <TotalProgress/>
    </div>
  )
}