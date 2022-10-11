import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'

import './Aplicar.css'

function AplicarAtributo(props){
/* Declaraciones */
const [puntos, setPuntos] = useState(0);
const [seleccionador, setSeleccionador] = useState(0)
const [state, setState] = useState(0)
const [temporal, setTemporal] = useState(0)

const db = getFirestore(app)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')

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

/* ************ Traer datos de la base de datos ************* */
const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((documento) => {
    setTemporal(parseInt(documento.data().Puntos));
    setObtId(documento.id)
  },);
};


  /* Actualizar los datos de un estudiante en firestore */
const ActualizarDatos = async () => {
  obtenerEstudiante();
    await updateDoc(doc(db, "Estudiantes", obtId), {
      Puntos: 5 + temporal
    });
 }

 useEffect (() => {
  obtenerEstudiante();
  ActualizarDatos();    
},[]);





  const evaluar = () => { 
    if (seleccionador === 3){
        setPuntos(5);
        mensajeCorrecto(5);
        ActualizarDatos();
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
    <div className='container-Bloom-Aplicar'>

        <div className='preguntaAplicarAtributo'>
            
            <div className='bloque-pregunta'>
          
            </div>

        </div>
        <div className='opcionesAplicarAtributo'>
            <button className='AplicarAtributoOpcion1' onClick={seleccionar1}>Int</button>
            <button className='AplicarAtributoOpcion2' onClick={seleccionar2}>Char</button>
            <button className='AplicarAtributoOpcion3' onClick={seleccionar3}>Double</button>
            <button className='AplicarAtributoOpcion4' onClick={seleccionar4}>Long int</button>
        </div>
          
        <button onClick={evaluar} className='evaluarAplicarAtributo'>Evaluar</button>
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

export default AplicarAtributo