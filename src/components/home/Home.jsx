import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'
import ImagenHombre from '../../img/imgProfile/Hombre.png'
import ImagenMujer from '../../img/imgProfile/Mujer.png'
import ImagenNoDefinida from '../../img/imgProfile/Silueta.png'

//import { useNavigate } from "react-router-dom";

export function Home() {
  const {user, loading} = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  
  return ( 
    <div>
      <Navbar />
      <div className="Total">
          Progreso Total
      </div>
      <div className="Posiciones">
        Tabla de posiciones
      </div>
    </div>
  )
}