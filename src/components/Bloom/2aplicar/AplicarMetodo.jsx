import React, {useState, useEffect} from 'react'
import opcionesComprenderObjeto from '../../../img/taxonomia/2Aplicar/Metodos/DiagramaAplicarMetodo.png'
import swal from 'sweetalert'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {app} from '../../../Firebase'
import { getAuth } from 'firebase/auth'

import './Aplicar.css'

function ComprenderObjeto(props){
/* Declaraciones */
const [seleccionador, setSeleccionador] = useState(0)
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

/* Ejercicio */
  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
        <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #2</h1>
            <span className='TextoPregunta'>Partiendo del ejercicio anterior, determine el resultado producido por 
            el siguiente método con valores preestablecidos.</span>
          
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
    </div>
  )
}

export default ComprenderObjeto
