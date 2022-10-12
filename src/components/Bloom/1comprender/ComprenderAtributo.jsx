import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import './Comprender.css'

function ComprenderAtributo(props){



/* ************ Datos de entrada ************* */
const [temporal, setTemporal] = useState(0)

const db = getFirestore(app)

const [seleccionador, setSeleccionador] = useState(0)
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

 

/* Declaraciones */


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
      ActualizarDatos();
      mensajeCorrecto(5);
      props.evento();
          
    }
    else{
      mensajeIncorrecto();
      props.evento();
    }
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
        <div className='preguntaComprenderAtributo'>
            <div className='bloque-pregunta'>
                <h1 className='TituloPregunta'>Actividad #1</h1>
                <span className='TextoPregunta'>¿Por qué es incorrecto declarar al atributo -FechaNacimiento = 2001 como un double?.</span>
            </div>


        </div>
        <div className='opcionesComprenderAtributo'>
        <button className='AplicarAtributoOpcion1' onClick={seleccionar1}>Porque -FechaNacimiento es un número muy grande</button>
            <button className='AplicarAtributoOpcion2' onClick={seleccionar2}>Porque -FechaNacimiento es un número muy pequeño</button>
            <button className='AplicarAtributoOpcion3' onClick={seleccionar3}>Porque las operaciones matemáticas se realizan con "char"</button>
            <button className='AplicarAtributoOpcion4' onClick={seleccionar4}>Porque el 2001 es un entero que debe definirse como "int"</button>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderAtributo'>Evaluar</button>
        <span className='SeleccionadorComprenderAtributo'>Opción seleccionada: {seleccionador}</span>
    </div>
  )
}

export default ComprenderAtributo