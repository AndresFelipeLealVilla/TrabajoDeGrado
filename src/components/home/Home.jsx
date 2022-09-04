import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'
import Chatbot from "../chatbot/Chatbot"
import { render } from "@testing-library/react"
import ComprenderClase from "../Bloom/comprender/ComprenderClase"
import AnalizarMetodosAtributos from "../Bloom/analizar/AnalizarMetodosAtributos"
import EvaluarClase from "../Bloom/evaluar/EvaluarClase"
import ProyeccionProgress from "../progressBar/ProyeccionProgress"
import Positions from "../PositionsTable/Positions"
//import { useNavigate } from "react-router-dom";

export function Home() {
  const {loading} = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  
  return ( 
    <div>
      <Navbar />
      <Chatbot/>
      <EvaluarClase/>
      <ProyeccionProgress/>
      <Positions/>
    </div>
  )
}