import React, {useState, useEffect} from 'react'
import swal from 'sweetalert2'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {app} from '../../../Firebase'
import { getAuth } from 'firebase/auth'
import TrofeoMetodos from '../../../img/imgTrofeo/Metodos.png'


import opcion2 from '../../../img/taxonomia/4Evaluar/Metodos/opcion1.png'
import opcion1 from '../../../img/taxonomia/4Evaluar/Metodos/opcion2.png'
import opcion3 from '../../../img/taxonomia/4Evaluar/Metodos/opcion3.png'
import opcion4 from '../../../img/taxonomia/4Evaluar/Metodos/opcion4.png'


import './Evaluar.css'

function EvaluarMetodo(props){
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
    if(documento.data().TrofeoMetodo === 0){
      setTrofeo(parseInt(documento.data().TrofeoMetodo));
      setObtId(documento.id)
    }
    
  },);
};


  /* Actualizar los datos de un estudiante en firestore */
const ActualizarDatos = async () => {
  obtenerEstudiante();
    await updateDoc(doc(db, "Estudiantes", obtId), {
      Puntos: 5 + temporal,
      TrofeoMetodo: 1 + trofeo
    });
 }

 useEffect (() => {
  obtenerEstudiante();
  ActualizarDatos();    
},[]);



const mensajeCorrecto = () => {
  swal.fire({
    title: '¡¡Felicitaciones!!',
    text: 'Completaste la fase de Métodos',
    imageUrl: TrofeoMetodos,
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

const seleccionar4 = () => {
  setSeleccionador(4);
}
 
/* Ejercicio */

  const evaluar = () => { 
    if (seleccionador === 2){
        ActualizarDatos();
        mensajeCorrecto(5);
        props.evento();
    }
    else{
        mensajeIncorrecto();
        props.evento();
    }
  } 

/* Ejercicio */
  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
        <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #4</h1>
            <span className='TextoPregunta'>Determine cual de los siguientes segmentos de código retorna un correo 
            compuesto por el nombre y el apellido .</span>
          
            </div>

        </div>
        <div className='opcionesObjeto'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='EvaluarMetodo1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='EvaluarMetodo2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='EvaluarMetodo3'/>
            <img src={opcion4} onClick={seleccionar4} alt='opcion4' className='EvaluarMetodo4'/>
        </div>
          
        <button onClick={evaluar} className='evaluarComprenderObjeto'>Evaluar</button>
        <span className='Seleccionador'>Opción seleccionado: {seleccionador}</span>
    </div>
  )
}

export default EvaluarMetodo
