import React, {useState} from 'react'
import swal from 'sweetalert'
import claseVehiculo from '../../../img/taxonomia/1Comprender/Clases/DiagramaComprenderClase.png'
import opcion1 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo1.png'
import opcion2 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo2.png'
import opcion3 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo3.png'
import opcion4 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo4.png'
import './Comprender.css'

import ProgressBar from '../../progressBar/ProgressBar'

function ComprenderClase(props){

/* Declaraciones */
  const [puntos, setPuntos] = useState(0);
  const [seleccionador, setSeleccionador] = useState(0)

  const seleccionar1 = () => {
    setSeleccionador(1);
  }
  
  const seleccionar2 = () => {
    setSeleccionador(2);
  }
  
  const seleccionar3 = () => {
    setSeleccionador(3);
  }
  
  const seleccionar4 = () => {
    setSeleccionador(4);
  }
 
/* Ejercicio */

  const evaluar = () => { 
    if (seleccionador === 1){
          setPuntos(5);
          mensajeCorrecto(5);
    }
    else{
      mensajeIncorrecto();
        setPuntos(0);
    }
    props.evento();    
  } 
  
/* Mensaje Correcto */
  const mensajeCorrecto = (points) => {
    swal({
      icon: "success",
      title: "¡Gran Trabajo!",

      text: "Obtuviste: " + points + " puntos ¡¡¡FELICITACIONES!!!",
      button: "OK",
    });

  };

/* Mensaje Incorrecto */
  const mensajeIncorrecto = () => {
    swal({
      icon: "error",
      title: "¡Upss!",
      text: "Recuerda usar el chatbot para obtener ayuda",
      button: "OK",
    });
  };

/* Resultados */
  return (
    <div className='container-Bloom-comprender'>
        <div className='preguntaComprenderClase'>
            <div className='bloque-pregunta'>
          
            </div>
            <div className='Diagrama'>
              <img src={claseVehiculo} className='diagramaClase' alt='diagrama de clase vehiculo' />
            </div>

        </div>
        <div className='opcionesClase'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='ClaseComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='ClaseComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='ClaseComprenderOpcion3'/>
            <img src={opcion4} onClick={seleccionar4} alt='opcion4' className='ClaseComprenderOpcion4'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderClase'>Evaluar</button>
        <span className='SeleccionadorComprenderClase'>Opción seleccionada: {seleccionador}</span>
        <ProgressBar/>
    </div>
  )
}

export default ComprenderClase
