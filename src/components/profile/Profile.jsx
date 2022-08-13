import React, { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import Navbar from "../navbar/Navbar"
import ImagenHombre from '../../img/imgProfile/HombreG.PNG'
import ImagenMujer from '../../img/imgProfile/MujerG.PNG'
import ImagenNoDefinida from '../../img/imgProfile/SiluetaG.PNG'

export function Profile() {
  const email = getAuth().currentUser.email;
  const db = getFirestore(app)
  const user = getAuth().currentUser;
  
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

  const [genero, setGenero] = useState ('')
  const [imagenPerfil, setImagenPerfil] = useState('')


  useEffect (() => {
    const obtenerEstudiante = async () => {
        const qu = query(datosEstudiante, where("Email", "==", email));
        const querySnapshot = await getDocs(qu);
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.Correo, " => ", doc.data());
        setGenero(doc.data().Genero)
        setEstudiante(doc.data())
        console.log(genero)
        if (genero === 'Hombre') {
            setImagenPerfil(ImagenHombre)
            console.log('es hombre')
        } if (genero === 'Mujer') {
            setImagenPerfil(ImagenMujer)
            console.log('es mujer')
        } if(genero === 'NoDefinido'){
            setImagenPerfil(ImagenNoDefinida)
            console.log('no definido')
        }
    }
        );
    }
    obtenerEstudiante();
},[email, datosEstudiante, genero, estudiante])






  return (
    
    <div>
      <Navbar/>
      <div className='Perfil'>
        <div className='Perfil-container'>
          <img src={imagenPerfil} alt='imagen perfil' className='ImgPerfil'/>
          <table className='tabla1'>
            <tbody>
              <tr>
                <td>Nombre: {estudiante.Nombre}</td>
              </tr>
              <tr>
                <td>Apellido: {estudiante.Apellido}</td>
              </tr>
              <tr>
                <td>Nombre de Usuario: {estudiante.NombreUsuario}</td>
              </tr>
              <tr>
                <td>Edad: {estudiante.Edad}</td>
              </tr>
              <tr>
                <td>Genero: {estudiante.Genero}</td>
              </tr>
            </tbody>
          </table>

          <table className='tabla2'>
            <tbody>
              <tr>
                <td>Puntos: {estudiante.Puntos}</td>
              </tr>
              <tr>
                <td>Posición: {estudiante.Edad}</td>
              </tr>
              <tr>
                <td>Trofeos: {estudiante.Puntos}</td>
              </tr>
            </tbody>
          </table>
          <button className='btn-editar' onClick={handleSubmit}>Editar</button>
        </div>        
      </div>

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
