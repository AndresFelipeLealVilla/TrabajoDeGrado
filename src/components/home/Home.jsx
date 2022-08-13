import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'
import TotalProgress from "../totalProgress/TotalProgress"
import NClases from '../../img/imgTrofeo/NClases.png'
//import { useNavigate } from "react-router-dom";

export function Home() {
  const {user, loading} = useAuth()

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