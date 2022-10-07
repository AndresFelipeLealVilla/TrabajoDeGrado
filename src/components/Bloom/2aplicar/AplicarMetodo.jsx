import React, {useState} from 'react'
import opcionesComprenderObjeto from '../../../img/taxonomia/2Aplicar/Metodos/DiagramaAplicarMetodo.png'
import swal from 'sweetalert'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'

import './Aplicar.css'

function ComprenderObjeto(props){
/* Declaraciones */
const [puntos, setPuntos] = useState(0);
const [seleccionador, setSeleccionador] = useState(0)
const [state, setState] = useState(20)

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
    if (seleccionador === 4){
        setPuntos(5);
        mensajeCorrecto(5);
    }
    else{
        mensajeIncorrecto();
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


/* Ejercicio */
  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
            <div className='bloque-pregunta'>
          
            </div>

        </div>
        <div className='opcionesObjeto'>
        <img src={opcionesComprenderObjeto} alt='opcionesComprenderObjetos' className='opcionesComprenderObjetos'/>
            <button className='ObjetoComprenderOpcion1' onClick={seleccionar1}>500</button>
            <button className='ObjetoComprenderOpcion2' onClick={seleccionar2}>450</button>
            <button className='ObjetoComprenderOpcion3' onClick={seleccionar3}>425</button>
            <button className='ObjetoComprenderOpcion4' onClick={seleccionar4}>428</button>
        </div>
          
        <button onClick={evaluar} className='evaluarComprenderObjeto'>Evaluar</button>
        <span className='Seleccionador'>Opción seleccionado: {seleccionador}</span>

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

export default ComprenderObjeto
