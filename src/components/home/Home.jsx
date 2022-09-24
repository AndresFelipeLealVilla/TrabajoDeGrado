import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'
import Chatbot from "../chatbot/Chatbot"
import ProyeccionProgress from "../progressBar/ProyeccionProgress"
import Positions from "../PositionsTable/Positions"
import React, { useState } from "react";
import Mecanica from "../mecanica/Mecanica"
import Carousel from '../mecanica/Carousel'

export function Home() {
  const [state, setState] = useState(0);
  const {loading} = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  const incrementar = () => {
    setState(state + 1);
  }
  const boton = <button defaultChecked={false} onClick={incrementar}>Saltar</button>

  return ( 
    
    <> 
      <Navbar />
      <Chatbot/>
      <ProyeccionProgress/>
      <Positions/>
      <div className="container-Bloom1">
      {state === 0 ? <Carousel/> : <Mecanica/>}
      {state === 0 ? boton : null}
      </div>

      
      
    </>
  )


}