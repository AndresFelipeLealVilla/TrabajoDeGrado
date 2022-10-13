import React, {useState, useEffect} from 'react'
import swal from 'sweetalert2'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import TrofeoAtributos from '../../../img/imgTrofeo/Atributos.png'

import './Evaluar.css'


function EvaluarAtributo(props){
/* Declaraciones */
const [seleccionador, setSeleccionador] = useState(0)
const [temporal, setTemporal] = useState(0)

const db = getFirestore(app)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')
const [activador, setActivador] = useState(4)
const [trofeo, setTrofeo] = useState(0)

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
    if(documento.data().TrofeoAtributo === 0){
      setTrofeo(parseInt(documento.data().TrofeoAtributo));
      setObtId(documento.id)
    }
    
  },);
};


  /* Actualizar los datos de un estudiante en firestore */
const ActualizarDatos = async () => {
  obtenerEstudiante();
    await updateDoc(doc(db, "Estudiantes", obtId), {
      Puntos: 5 + temporal,
      TrofeoAtributo: 1 + trofeo,
    });
 }

 useEffect (() => {
  obtenerEstudiante();
  ActualizarDatos();    
},[]);





  const evaluar = () => { 
    if (seleccionador === 3){
        mensajeCorrecto(5);
        ActualizarDatos();
        props.evento();
    }
    else{
        mensajeIncorrecto();
    }
    props.evento();
  } 

 /* Mensaje Correcto */
  const mensajeCorrecto = () => {
      swal.fire({
        title: '¡¡Felicitaciones!!',
        text: 'Completaste la fase de Atributos',
        imageUrl: TrofeoAtributos,
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

/* Ejercicio */
  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
        <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #4</h1>
            <span className='TextoPregunta'>Determine el tipo de dato que no hacer parte del lenguaje 
            de programación c++ para definir atributos.</span>
          
            </div>

        </div>
        <div className='opcionesComprenderObjeto'>
            <button className='ObjetoComprenderOpcion1' onClick={seleccionar1}>int</button>
            <button className='ObjetoComprenderOpcion2' onClick={seleccionar2}>long int</button>
            <button className='ObjetoComprenderOpcion3' onClick={seleccionar3}>varchar</button>
            <button className='ObjetoComprenderOpcion4' onClick={seleccionar4}>boolean</button>
        </div>
          
        <button onClick={evaluar} className='evaluarComprenderObjeto'>Evaluar</button>
        <span className='Seleccionador'>Opción seleccionado: {seleccionador}</span>
    </div>
  )
}

export default EvaluarAtributo

