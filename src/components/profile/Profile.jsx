import React, {useState} from 'react'
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { async } from '@firebase/util';


export function Profile() {

  const email = getAuth().currentUser.email;
  console.log(email)
  const db = getFirestore(app)

  
// recibir datos de componente register
  const [estudiante, setEstudiante] = useState({
    Correo: email,
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Puntos: 20,
    Genero: '',
  });



// Create a reference to the cities collection
const citiesRef = collection(db, "Estudiantes");

// Create a query against the collection.
const q = query(citiesRef, where("Correo", "==", email));

const handleInputChange = async (e) => {
  const {name, value} = e.target;
  setEstudiante({...estudiante, [name]: value})
};


  const handleSubmit = async (e) => {  
    e.preventDefault();
    //console.log(estudiante)
  }


  return (
    <div>
      <h1>Nombre: </h1>
      <form className='formularioPerfil'>
      <input name="Email" type="Email" placeholder=" Email" onChange={handleInputChange} value={email} readOnly/>
        <input name="Nombre" type="name"  onChange={handleInputChange}  placeholder=" Nombre" value={estudiante.Nombre}/>
        <input name="Apellido" type="lastname" onChange={handleInputChange} placeholder=" Apellido "value={estudiante.Apellido}/>
        <input name="NombreUsuario" type="userName" onChange={handleInputChange} placeholder="  Nombre de usuario" value={estudiante.NombreUsuario} />
        <input name="Edad" type="age" onChange={handleInputChange} placeholder=" Edad " value={estudiante.Edad} />
        <button className="buttonOK" onClick={handleSubmit} >Guardar</button> 
      </form>
    </div>
  )
}
