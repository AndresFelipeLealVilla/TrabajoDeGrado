import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import claseVehiculo from '../../../img/taxonomia/1Comprender/Clases/DiagramaComprenderClase.png'
import opcion1 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo1.png'
import opcion2 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo2.png'
import opcion3 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo3.png'
import opcion4 from '../../../img/taxonomia/1Comprender/Clases/ClaseVehiculo4.png'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import './Comprender.css'
import Positions from '../../PositionsTable/Positions'

function ComprenderClase(props){



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
  
  const seleccionar4 = () => {
    setSeleccionador(4);
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
        <div className='preguntaComprenderClase'>
            <div className='bloque-pregunta'>
          
            </div>
            <div className='Diagrama'>
              <img src={claseVehiculo} className='diagramaClase' alt='diagrama de clase vehiculo' />
            </div>

        </div>
        <div className='opcionesClase'>
            <img src={opcion1} onClick={seleccionar1} alt='opcion1' className='ClaseComprenderOpcion1'/>
            <img src={opcion2} onClick={seleccionar2} alt='opcion2' className='ClaseComprenderOpcion2'/>
            <img src={opcion3} onClick={seleccionar3} alt='opcion3' className='ClaseComprenderOpcion3'/>
            <img src={opcion4} onClick={seleccionar4} alt='opcion4' className='ClaseComprenderOpcion4'/>
        </div>
          
        <button onClick={evaluar} className='evaluarcomprenderClase'>Evaluar</button>
        <span className='SeleccionadorComprenderClase'>Opción seleccionada: {seleccionador}</span>


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

export default ComprenderClase
