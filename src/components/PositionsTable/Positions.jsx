import React, {useState, useEffect} from 'react'
import './Positions.css'
import {app} from '../../Firebase'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function Positions() {

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
  console.log(estudiantes)};


  /* ************ Traer datos al cargar el perfil ************* */    
  useEffect (() => {
    try {
      obtenerEstudiante();
      ordenar();   
    } catch (error) {
      console.log(error)
    }
      
},[]);

const numero = 1;

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
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntos</th>
            </tr>
          </thead>
            <tbody>
              {posicion.map((posicion, index) => (
                <tr key={posicion.id}>
                  <td>{}</td>
                  <td>{posicion.Nombre}</td>
                  <td>{posicion.Puntos}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
    
  )
}

export default Positions