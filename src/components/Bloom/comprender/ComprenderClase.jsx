import React from 'react'
import './Comprender.css'
import  claseVehiculo from '../../../img/diagramas/ClaseVehiculo.png'
import opcion1 from '../../../img/Comprender/Clases/Opcion1.png'
import ProgressBar from '../../progressBar/ProgressBar'

function ComprenderClase() {

  const active = () =>{
    return true
  }

  const ampliar = () => {
    if (active) {
      console.log('hola')
    }
  }
  
  return (
    <div className='container-Bloom-comprender'>
        <div className='pregunta'>
           <span onClick={active}> <img src={claseVehiculo} onClick={active}  className='diagrama' alt='diagrama de clase vehiculo' /></span>
           <button className='evaluar-comprenderClase'>Evaluar</button>
           <ProgressBar />
        </div>
        <div className='bloque-pregunta'>

        </div>
        <div className='pregunta'>

        </div>
        <div className='opcion1'>
          <img src={opcion1} className='img1'/>
          
        </div>

        <div className='opcion2'>

        </div>

        <div className='opcion3'>

        </div>

        <div className='opcion4'>

        </div>
        
    </div>
  )
}

export default ComprenderClase
