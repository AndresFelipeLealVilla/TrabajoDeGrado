import React, {useState} from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import Navbar from "../navbar/Navbar"

export function Profile() {
  const email = getAuth().currentUser.email;
  const db = getFirestore(app)
  
// recibir datos de componente register
  const [estudiante, setEstudiante] = useState({
    Correo: email,
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Puntos: 0,
    Genero: '',
  });

// Create a reference to the cities collection
const datosEstudiante = collection(db, "Estudiantes");

// Create a query against the collection.
const qu = query(datosEstudiante, where("Email", "==", email));

const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  console.log(doc.Correo, " => ", doc.data());
  setEstudiante(doc.data())
 }
  );};

const handleInputChange = async (e) => {
  const {name, value} = e.target;
  setEstudiante({...estudiante, [name]: value})
  console.log(estudiante)
  obtenerEstudiante();
  
};

  const handleSubmit = async (e) => {  
    e.preventDefault();
    obtenerEstudiante();
    
  }

  return (
    
    <div>
      <Navbar/>
      <table>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
      </table>




      <form className='formularioPerfil'>
        <input name="Email" type="Email" placeholder=" Email" onChange={handleInputChange} value={email} readOnly/>
        <input name="Nombre" type="name"  onChange={handleInputChange}  placeholder=" Nombre" value={estudiante.Nombre}/>
        <input name="Apellido" type="lastname" onChange={handleInputChange} placeholder=" Apellido "value={estudiante.Apellido}/>
        <input name="NombreUsuario" type="userName" onChange={handleInputChange} placeholder="  Nombre de usuario" value={estudiante.NombreUsuario} />
        <input name="Edad" type="age" onChange={handleInputChange} placeholder=" Edad " value={estudiante.Edad} />
        <button className="buttonOK" onClick={handleSubmit} >Actualizar</button> 
      </form>
    </div>
  )
}
