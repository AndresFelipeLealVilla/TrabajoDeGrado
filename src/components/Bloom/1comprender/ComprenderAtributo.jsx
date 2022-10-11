import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import opcion1 from '../../../img/taxonomia/1Comprender/Atributos/ComprenderAtributos1.png'
import opcion2 from '../../../img/taxonomia/1Comprender/Atributos/ComprenderAtributos2.png'
import opcion3 from '../../../img/taxonomia/1Comprender/Atributos/ComprenderAtributos3.png'

import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import './Comprender.css'
import Positions from '../../PositionsTable/Positions'

function ComprenderAtributo(props){



/* ************ Datos de entrada ************* */
const [temporal, setTemporal] = useState(0)

const db = getFirestore(app)

const [seleccionador, setSeleccionador] = useState(0)
const [state, setState] = useState(0)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')
const [activador, setActivador] = useState(1)


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
 
/* Ejercicio */

  const evaluar = () => { 
    if (seleccionador === 1){
      ActualizarDatos();
      mensajeCorrecto(5);
      <Positions dato={activador}/>
          
    }
    else{
      mensajeIncorrecto();
    }
    props.evento();
    setTemporal(0);  
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
          
            </div>


        </div>
        <div className='opcionesComprenderAtributo'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='AtributoComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='AtributoComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='AtributoComprenderOpcion3'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderAtributo'>Evaluar</button>
        <span className='SeleccionadorComprenderAtributo'>Opción seleccionada: {seleccionador}</span>


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

export default ComprenderAtributo