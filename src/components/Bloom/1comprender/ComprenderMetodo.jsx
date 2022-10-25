import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import opcion1 from '../../../img/taxonomia/1Comprender/Metodos/opcion1ComprenderMetodo.png'
import opcion2 from '../../../img/taxonomia/1Comprender/Metodos/opcion2ComprenderMetodo.png'
import opcion3 from '../../../img/taxonomia/1Comprender/Metodos/opcion3ComprenderMetodo.png'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {app} from '../../../Firebase'
import { getAuth } from 'firebase/auth'
import progreso from '../../../img/Progreso/25.jpg'

import './Comprender.css'

function ComprenderMetodo(props){

/* Declaraciones */
  const [puntos, setPuntos] = useState(0);
  const [seleccionador, setSeleccionador] = useState(0)
  const [state, setState] = useState(0)

  const[temporal, setTemporal] = useState(0);
const db = getFirestore(app)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')



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


  const seleccionar1 = () => {
    setSeleccionador(1);
  }
  
  const seleccionar2 = () => {
    setSeleccionador(2);
  }
  
  const seleccionar3 = () => {
    setSeleccionador(3);
  }
 
/* Ejercicio */

  const evaluar = () => { 
    if (seleccionador === 1){
        ActualizarDatos();
        mensajeCorrecto(5);
        props.evento();
    }
    else{
      mensajeIncorrecto();
      props.evento();
    } 
  } 

  /* Resultados */
  return (
    <div className='container-Bloom-comprender'>
        <div className='preguntaComprenderMetodo'>
            <div className='bloque-preguntaComprenderMetodo'>
            <h1 className='TituloPregunta'>Actividad #1</h1>
                <span className='TextoPreguntaComprenderMetodo'>Observe los tres segmentos de codigo y resuelva lo siguiente: 
                <p>Se presenta la clase Cuenta, en la cual se debe implementar un método que retorne el valor total 
                  de la compra de 5 artículos. Cada uno de los artículos tiene un descuento diferente.</p>
                  </span>
            </div>
        </div>
        <div className='opcionesComprenderMetodo'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='MetodoComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='MetodoComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='MetodoComprenderOpcion3'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderMetodo'>Evaluar</button>
        <span className='SeleccionadorComprenderMetodo'>Opción seleccionada: {seleccionador}</span>
        <img src={progreso} alt='progreso' className='Progreso'/>
    </div>
  )
}

export default ComprenderMetodo
