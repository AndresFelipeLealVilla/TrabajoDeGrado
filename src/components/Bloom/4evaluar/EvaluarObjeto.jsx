import React, {useState, useEffect} from 'react'
import swal from 'sweetalert2'

import opcion1 from '../../../img/taxonomia/4Evaluar/Objetos/opcion1.png'
import opcion2 from '../../../img/taxonomia/4Evaluar/Objetos/opcion2.png'
import opcion3 from '../../../img/taxonomia/4Evaluar/Objetos/opcion3.png'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {app} from '../../../Firebase'
import { getAuth } from 'firebase/auth'
import TrofeoObjetos from '../../../img/imgTrofeo/Objetos.png'

import './Evaluar.css'

function ComprenderMetodo(props){

/* Declaraciones */
  const [seleccionador, setSeleccionador] = useState(0)
  const[temporal, setTemporal] = useState(0);
  const db = getFirestore(app)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')
const [trofeo, setTrofeo] = useState(0)



 /* ************ Traer datos de la base de datos ************* */
 const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((documento) => {
    setTemporal(parseInt(documento.data().Puntos));
    if(documento.data().TrofeoObjeto === 0){
      setTrofeo(parseInt(documento.data().TrofeoObjeto));
      setObtId(documento.id)
    }
    
  },);
};


  /* Actualizar los datos de un estudiante en firestore */
const ActualizarDatos = async () => {
  obtenerEstudiante();
    await updateDoc(doc(db, "Estudiantes", obtId), {
      Puntos: 5 + temporal,
      TrofeoObjeto: 1 + trofeo
    });
 }

 useEffect (() => {
  obtenerEstudiante();
  ActualizarDatos();    
},[]);



const mensajeCorrecto = () => {
  swal.fire({
    title: '¡¡Felicitaciones!!',
    text: 'Completaste la fase de Objetos',
    imageUrl: TrofeoObjetos,
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
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
    if (seleccionador === 3){
          mensajeCorrecto(5);
          ActualizarDatos();
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
        <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #4</h1>
            <span className='TextoPregunta'>Decida cuál de los siguientes segmentos de código incumple las reglas 
            de creación de los objetos.</span>
          
            </div>
        </div>
        <div className='opcionesComprenderMetodo'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='MetodoComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='MetodoComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='MetodoComprenderOpcion3'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderMetodo'>Evaluar</button>
        <span className='SeleccionadorComprenderMetodo'>Opción seleccionada: {seleccionador}</span>
    </div>
  )
}

export default ComprenderMetodo
