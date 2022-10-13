import React, {useState, useEffect} from 'react'
import claseVehiculo from '../../../img/taxonomia/1Comprender/Objetos/DiagramaComprenderObjeto.png'
import ComprenderObjCodigo from '../../../img/taxonomia/1Comprender/Objetos/opcionesComprenderObjetos.PNG'
import swal from 'sweetalert'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'

import './Comprender.css'

function ComprenderObjeto(props){
/* Declaraciones */
const [puntos, setPuntos] = useState(0);
const [seleccionador, setSeleccionador] = useState(0)
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


/* Ejercicio */
  return (
    <div className='container-Bloom-comprender'>

        <div className='preguntaComprenderObjeto'>
            
            <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #1</h1>
                <span className='TextoPregunta'>Observe el siguiente diagrama de clases y determine la forma correcta de instanciar la clase Vehículo.</span>
            </div>

            <div className='Diagrama'>
              <span> <img src={claseVehiculo} className='DiagramaComprenderClase' alt='diagrama de clase vehiculo' /></span>
            </div>

        </div>
        <div className='opcionesComprenderObjeto'>
        <img src={ComprenderObjCodigo} alt='opcionesComprenderObjetos' className='opcionesComprenderObjetos'/>
            <button className='ObjetoComprenderOpcion1' onClick={seleccionar1}>Opción 1</button>
            <button className='ObjetoComprenderOpcion2' onClick={seleccionar2}>Opción 2</button>
            <button className='ObjetoComprenderOpcion3' onClick={seleccionar3}>Opción 3</button>
            <button className='ObjetoComprenderOpcion4' onClick={seleccionar4}>Opción 4</button>
        </div>
          
        <button onClick={evaluar} className='evaluarComprenderObjeto'>Evaluar</button>
        <span className='Seleccionador'>Opción seleccionado: {seleccionador}</span>
    </div>
  )
}

export default ComprenderObjeto

