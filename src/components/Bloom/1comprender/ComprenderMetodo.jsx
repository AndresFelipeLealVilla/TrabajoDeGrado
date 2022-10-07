import React, {useState} from 'react'
import swal from 'sweetalert'

import opcion1 from '../../../img/taxonomia/1Comprender/Metodos/opcion1ComprenderMetodo.png'
import opcion2 from '../../../img/taxonomia/1Comprender/Metodos/opcion1ComprenderMetodo.png'
import opcion3 from '../../../img/taxonomia/1Comprender/Metodos/opcion1ComprenderMetodo.png'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'

import './Comprender.css'

function ComprenderMetodo(props){

/* Declaraciones */
  const [puntos, setPuntos] = useState(0);
  const [seleccionador, setSeleccionador] = useState(0)
  const [state, setState] = useState(0)

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
        <div className='preguntaComprenderMetodo'>
            <div className='bloque-pregunta'>
          
            </div>
        </div>
        <div className='opcionesMetodo'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='MetodoComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='MetodoComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='MetodoComprenderOpcion3'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderMetodo'>Evaluar</button>
        <span className='SeleccionadorComprenderMetodo'>Opción seleccionada: {seleccionador}</span>

            <div className="contenedorBarra">
      <h2 className="porcentaje"
        style={{
          color: state === 100 ? "#e84118" : "Black"
        }}
      >
        {state === 100
          ? "Completo"
          : `${state}%`}
      </h2>
      <ProyeccionProgress width={state} />
      <ProgressButton
        progress={state}
        makeProgress={() => {
          state < 100 ? setState(state + 20) : setState(0);
        }}
      />
    </div> 
    </div>
  )
}

export default ComprenderMetodo
