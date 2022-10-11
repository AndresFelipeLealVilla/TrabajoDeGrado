import { useAuth } from "../../context/authContext" 
import Navbar from "../navbar/Navbar"
import './Home.css'

import ProyeccionProgress from "../progressBar/ProyeccionProgress"
import Positions from "../PositionsTable/Positions"
import React, { useState } from "react";
import Mecanica from "../mecanica/Mecanica"
import Carousel from '../mecanica/Carousel'
import Chat from "../chatbot/Chatbot"


export function Home(props) {
  const [state, setState] = useState(0);
  const {loading} = useAuth()
  const[activador, setActivador] = useState(1)

  if (loading) {
    return <div>Loading...</div>
  }

  const incrementar = () => {
    setState(state + 1);
  }
  const boton = <button defaultChecked={false} className='Saltar' onClick={incrementar}>Saltar</button>

  return ( 
    
    <> 
      <Navbar />
      <Chat/>
      <Positions dato={activador}/>
      <ProyeccionProgress />
      <div className="container-Bloom1">
      {state === 0 ? <Carousel/> : <Mecanica/>}
      {state === 0 ? boton : null}
      </div>

      
      
    </>
  )


}