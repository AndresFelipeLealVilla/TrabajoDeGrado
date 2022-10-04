import React, {useState} from 'react'
import './Comprender.css'
import claseVehiculo from '../../../img/taxonomia/1Comprender/PreguntaComprenderClase.jpg'
import opcionesComprenderObjeto from '../../../img/taxonomia/1Comprender/opcionesComprenderObjetos.PNG'
import swal from 'sweetalert'
import { useEffect } from 'react'
import { useStopwatch } from "react-timer-hook";


function ComprenderObjeto(props){


/* Temporizador */

const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
  const {
    seconds,
    isRunning,
    pause,

  } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
 
/* Ejercicio */

  const evaluar = () => { 
    if (seleccionador === 3){
        pause();
        if (secondTime < 20){
          setPuntos(10);
          mensajeCorrecto(10);
        }
        if (secondTime >=20 && secondTime < 40){
          setPuntos(7);
          mensajeCorrecto(7);
        }
        if (secondTime >=40 && secondTime < 60){
          setPuntos(5);
          mensajeCorrecto(5);
        }
        props.evento();
    }
    else{
      mensajeIncorrecto();
    }
    
} 
  
  const mensajeCorrecto = (points) => {
    swal({
      icon: "success",
      title: "¡Gran Trabajo!",

      text: "Obtuviste: " + points + " puntos y tu tiempo es de: " + secondTime + " segundos",
      button: "OK",
    });

  };

  const mensajeIncorrecto = () => {
    swal({
      icon: "error",
      title: "¡Upss!",
      text: "Recuerda usar el chatbot para obtener ayuda, ¡Intentalo de nuevo! "+ puntos + secondTime,
      button: "OK",
    });
  };

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

  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
            <div className='bloque-pregunta'>
          
            </div>

            <div className='Diagrama'>
              <span> <img src={claseVehiculo} className='diagramaClase' alt='diagrama de clase vehiculo' /></span>
            </div>

        </div>
        <div className='opcionesObjeto'>
        <img src={opcionesComprenderObjeto} alt='opcionesComprenderObjetos' className='opcionesComprenderObjetos'/>
            <button className='ObjetoComprenderOpcion1' onClick={seleccionar1}>Opción 1</button>
            <button className='ObjetoComprenderOpcion2' onClick={seleccionar2}>Opción 2</button>
            <button className='ObjetoComprenderOpcion3' onClick={seleccionar3}>Opción 3</button>
            <button className='ObjetoComprenderOpcion4' onClick={seleccionar4}>Opción 4</button>
        </div>
          
          
        <div style={{ fontSize: "100px", zIndex:"100" }}>
        <span className='Timer'>{secondTime}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
        <button onClick={evaluar} className='evaluar-comprenderObjeto'>Evaluar</button>
        <span className='Seleccionador'>Opción seleccionado: {seleccionador}</span>
         
    </div>
  )
}

export default ComprenderObjeto

