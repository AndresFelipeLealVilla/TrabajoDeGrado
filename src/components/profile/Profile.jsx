import React, {useState} from 'react'
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";




export function Profile() {

  const email = getAuth().currentUser.email;
  const db = getFirestore(app)

  
// recibir datos de componente register


  const [estudiante, setEstudiante] = useState({
    Correo: '',
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Puntos: 20,
    Genero: '',
  });
 





const handleInputChange = async (e) => {
  const {name, value} = e.target;
  setEstudiante({...estudiante, [name]: value})
};


  const handleSubmit = async (e) => {  
    e.preventDefault();
    importarDatos();
    console.log(estudiante)
  }

  function importarDatos(props){
    return(
      <div>
        {props.Nombre}
       {props.Apellido}
      {props.NombreUsuario}
      {props.Edad}
      {props.Puntos}
      {props.Genero}
      </div>
  
    );
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
