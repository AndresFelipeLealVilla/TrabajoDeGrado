import React, {useState, useEffect} from 'react'
import swal from 'sweetalert2'

import opcion2 from '../../../img/taxonomia/4Evaluar/Clases/Evaluar1.png'
import opcion1 from '../../../img/taxonomia/4Evaluar/Clases/Evaluar2.png'
import opcion3 from '../../../img/taxonomia/4Evaluar/Clases/Evaluar3.png'
import opcion4 from '../../../img/taxonomia/4Evaluar/Clases/Evaluar4.png'
import codigoEvaluarClase from '../../../img/taxonomia/4Evaluar/Clases/PreguntaAnimal.png'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import TrofeoClases from '../../../img/imgTrofeo/Clases.png'

import './Evaluar.css'

function EvaluarClase(props){

/* Declaraciones */
  const [seleccionador, setSeleccionador] = useState(0)
  /* Declaraciones */
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
        if(documento.data().TrofeoClase === 0){
          setTrofeo(parseInt(documento.data().TrofeoClase));
          setObtId(documento.id)
        }
      },);
    };
  
  
      /* Actualizar los datos de un estudiante en firestore */
    const ActualizarDatos = async () => {
      obtenerEstudiante();
        await updateDoc(doc(db, "Estudiantes", obtId), {
          Puntos: 5 + temporal,
          TrofeoClase: 1 + trofeo
        });
     }
  
     useEffect (() => {
      obtenerEstudiante();
      ActualizarDatos();    
  },[]);


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
          mensajeCorrecto();
          ActualizarDatos();
          props.evento();
    }
    else{
      mensajeIncorrecto();
      props.evento();
    }  
  } 
  
 /* Mensaje Correcto */
 const mensajeCorrecto = () => {
  swal.fire({
    title: '¡¡Felicitaciones!!',
    text: 'Completaste la fase de Clases',
    imageUrl: TrofeoClases,
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
};
/* Mensaje Incorrecto */
  const mensajeIncorrecto = () => {
    swal.fire({
      icon: "error",
      title: "¡Upss!",
      text: "Recuerda usar el chatbot para obtener ayuda",
      button: "OK",
    });
  };

/* Resultados */
  return (
    <div className='container-Bloom-Evaluar'>
        <div className='preguntaEvaluarClase'>
        <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #4</h1>
            <span className='TextoPregunta'>Determine cuál de los constructores mostrados fue extraído de la clase Animal que se encuentra a continuación.</span>
            </div>
                <div className='pregunta'>
                    <div>
                        <img src={codigoEvaluarClase} alt='codigoEvaluarClase' className='codigoEvaluarClase'/>
                    </div>
                </div>
          
            
        </div>
        <div className='opcionesEvaluarClase'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='ClaseEvaluarOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='ClaseEvaluarOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='ClaseEvaluarOpcion3'/>
            <img src={opcion4} onClick={seleccionar4} alt='opcion4' className='ClaseEvaluarOpcion4'/>
        </div>
          
        <button onClick={evaluar} className='evaluarEvaluarClase'>Evaluar</button>
        <span className='SeleccionadorEvaluarClase'>Opción seleccionada: {seleccionador}</span>
    </div>
  )
}

export default EvaluarClase

