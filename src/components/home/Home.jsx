import { useAuth } from "../../context/authContext"
import {database} from "../../Firebase" 
import Navbar from "../navbar/Navbar"
//import { useNavigate } from "react-router-dom";

export function Home() {
  const {user, logout, loading} = useAuth()
  
  const handleLogout = async () => {
      await logout()
  };
  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    
    <div>
      <Navbar />
      <h1>Welcome {user.email}</h1>
      <button onClick={(handleLogout)}>
        Logout
      </button>
    </div>
  )
}