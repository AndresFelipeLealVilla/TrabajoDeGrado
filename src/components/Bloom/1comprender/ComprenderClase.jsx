import React from 'react'
import './Comprender.css'
import claseVehiculo from '../../../img/taxonomia/1Comprender/PreguntaComprenderClase.jpg'
import opcion1 from '../../../img/taxonomia/1Comprender/ClaseVehiculo1.png'
import opcion2 from '../../../img/taxonomia/1Comprender/ClaseVehiculo2.png'
import opcion3 from '../../../img/taxonomia/1Comprender/ClaseVehiculo3.png'
import opcion4 from '../../../img/taxonomia/1Comprender/ClaseVehiculo4.png'

function ComprenderClase() {

  return (
    <div className='container-Bloom-comprender'>
        <div className='preguntaComprenderClase'>
            <div className='bloque-pregunta'>
          
            </div>

            <div className='Diagrama'>
              <span> <img src={claseVehiculo} className='diagramaClase' alt='diagrama de clase vehiculo' /></span>
            </div>

        </div>
        <div className='opcionesClase'>
            <img src={opcion1} alt='opcion1' className='ClaseComprenderOpcion1'/>
            <img src={opcion2} alt='opcion2' className='ClaseComprenderOpcion2'/>
            <img src={opcion3} alt='opcion3' className='ClaseComprenderOpcion3'/>
            <img src={opcion4} alt='opcion4' className='ClaseComprenderOpcion4'/>
        </div>
          
          
          
          
          
              
    </div>
  )
}

export default ComprenderClase
