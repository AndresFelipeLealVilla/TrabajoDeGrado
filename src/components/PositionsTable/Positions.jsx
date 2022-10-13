import React, {useState, useEffect} from 'react'
import './Positions.css'
import {app} from '../../Firebase'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function Positions(props) {

/* ************ Datos de entrada ************* */
const db = getFirestore(app)
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Puntos", ">", 0));


const [estudiantes, setEstudiantes] = useState([]);

/* ************ Traer datos de la base de datos ************* */
const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({...doc.data(), id: doc.id});
  }
  );
  setEstudiantes(docs)
  ordenar();
  console.log(estudiantes)};


  /* ************ Traer datos al cargar el perfil ************* */    



const [posicion, setPosicion] = useState([]);
const [temporal, setTemporal] = useState([]);

function ordenar() {
  const orden = estudiantes.sort((a, b) => b.Puntos - a.Puntos);
  setPosicion(orden);
  console.log(posicion);
  setTemporal(posicion.slice(0, 10));
}


useEffect (() => {
  obtenerEstudiante();   
},[props.dato]);



  return (
    <div className='Posiciones'>
        <table className='tablaPosiciones'>
          <thead>
            <tr>
              <th className='titulosPosicion'>Nombre</th>
              <th className='titulosPosicion'>Puntos</th>
            </tr>
          </thead>
            <tbody>
              <div className='resultadosposicion'>
              <hr className="lineaPositions"/>
              {temporal.map((posicion, index) => (
                
                <tr key={posicion.id}>
                  
                  <td className='posicion'>{posicion.NombreUsuario}</td>
                  <td className='posicion'>{posicion.Puntos}</td>
                  <br/>
                  <hr className="lineaSeparaciones"/>
                </tr>
              ))}
              </div>
              <button className='ActualizarTabla' onClick={obtenerEstudiante}>Actualizar</button>
            </tbody>
          </table>
    </div>
  
  )
}

export default Positions