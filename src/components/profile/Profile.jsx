/* *************** Paquetes importados **************** */
import React, { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import Navbar from "../navbar/Navbar"
import imagen1 from '../../img/Logo1.png'
import fondo from '../../img/imgProfile/fondoPerfil.PNG'
import hombre from '../../img/imgProfile/HombreG.PNG'
import mujer from '../../img/imgProfile/MujerG.PNG'
import silueta from '../../img/imgProfile/SiluetaG.PNG'
import { render } from '@testing-library/react';

export function Profile() {

/* ************ Datos de entrada ************* */
  const db = getFirestore(app)
  const user = getAuth().currentUser;
  const datosEstudiante = collection(db, "Estudiantes");
  const qu = query(datosEstudiante, where("Email", "==", user.email));
  const [activador, setActivador] = useState(0)
  
  const [estudiante, setEstudiante] = useState({
    Correo: user.email,
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Puntos: 0,
    Genero: '',
    Trofeos: 0,
  });


/* ************ Traer datos de la base de datos ************* */
const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((doc) => {
    setEstudiante(doc.data())
    console.log(estudiante)
  }
  );};

/* ************  ************* */
  const handleInputChange = async (e) => {
    const {name, value} = e.target;
    setEstudiante({...estudiante, [name]: value})
    
  };



/* ************ Función actualizar base de datos ************* */
  const ActualizarDatos = async (e) => { 
    e.preventDefault();
 
  }


/* ************* Activar la opcion de actualizar ************* */
const activarActualizacion = () => {
  setActivador(1)
}

/* ************ Traer datos al cargar el perfil ************* */    
  useEffect (() => {
      obtenerEstudiante();    
},[]);


/* ************ Return del perfil ************* */
  return (    
    <div className='Container'>
      <Navbar/>
      <div className='margenExterior'>
        <div className='margenInterior'>

          <img src={fondo} alt='fondoSperfil' className='fondo'/>

          <img src={imagen1} alt='Logo' className='LogoApp'/>
          <p className='Nombre-Logo'>NombreLogo</p>

          <div className='container-datos'>
            <img  className='Img-Perfil' src={estudiante.Genero === 'Hombre'
                ? hombre
                : estudiante.Genero === 'Mujer'
                ? mujer
                : silueta} alt='Logo'/> 
            <p className='nombreUser'>{estudiante.NombreUsuario}</p>
            <p className='Correo'>{estudiante.Email}</p>
          </div>
          

          <table className='tabla1'>
            <tbody>
              <tr>
                <td><span className='etiqueta'>Nombre:</span> {estudiante.Nombre}</td>
              </tr>
              <tr>
                <td><span className='etiqueta'>Apellido:</span>{estudiante.Apellido}</td>
              </tr>
              <tr>
                <td><span className='etiqueta'>Edad:</span> {estudiante.Edad}</td>
              </tr>
              <tr>
                <td><span className='etiqueta'>Genero:</span>{estudiante.Genero}</td>
              </tr>
            </tbody>
          </table>

          <table className='tabla2'>
            <tbody>
              <tr>
                <td><span className='etiqueta'>Puntos:</span>{estudiante.Puntos}</td>
              </tr>
              <tr>
                <td><span className='etiqueta'>Trofeos:</span>{estudiante.Trofeos}</td>
              </tr>
              <tr>
                <td><span className='etiqueta'>Posición:</span>{estudiante.Trofeos}</td>
              </tr>
            </tbody>
          </table>

          <button className='buttonEdit' onClick={activarActualizacion}>Editar</button>
        </div>
      </div>

        {activador === 0 ? null : 
          <div>
            <form className='FormularioActualizacion'>
              <input name="Email" type="Email" placeholder=" Email" onChange={handleInputChange} value={user.email} readOnly/>
              <input name="Nombre" type="name" placeholder=" Nombre" onChange={handleInputChange} value={estudiante.Nombre}/>
              <input name="Apellido" type="lastname" placeholder=" Apellido" onChange={handleInputChange} value={estudiante.Apellido}/>
              <input name="NombreUsuario" type="userName"  placeholder="  Nombre de usuario" onChange={handleInputChange} value={estudiante.NombreUsuario} />
              <input name="Edad" type="age" placeholder=" Edad " onChange={handleInputChange} value={estudiante.Edad} />
              <button className="buttonOK" onClick={ActualizarDatos} >Actualizar</button> 
            </form>
          </div>}
    </div>

      

  )
}
