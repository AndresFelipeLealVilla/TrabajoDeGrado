import React, {useState, useEffect} from 'react'
import './Positions.css'
import {app} from '../../Firebase'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function Positions() {

/* ************ Datos de entrada ************* */
const db = getFirestore(app)
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Puntos", ">", 0));
const [ciclo, setCiclo] = useState(0);

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

function ordenar() {
  const orden = estudiantes.sort((a, b) => b.Puntos - a.Puntos);
  setPosicion(orden);
  console.log(posicion);
}






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
              {posicion.map((posicion, index) => (
                <tr key={posicion.id}>
                  <td className='posicion'>{posicion.Nombre}</td>
                  <td className='posicion'>{posicion.Puntos}</td>
                </tr>
              ))}
              </div>
              <button className='Actualizar' onClick={obtenerEstudiante}></button>
            </tbody>
          </table>
    </div>
    
  )
}

export default Positions