import React, { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import Navbar from "../navbar/Navbar"
import ImagenHombre from '../../img/imgProfile/HombreG.PNG'
import ImagenMujer from '../../img/imgProfile/MujerG.PNG'
import ImagenNoDefinida from '../../img/imgProfile/SiluetaG.PNG'
import imagen1 from '../../img/Logo1.png'
import fondo from '../../img/imgProfile/fondoPerfil.PNG'

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
        setGenero(doc.data().Genero)
        setEstudiante(doc.data())
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
},[email, datosEstudiante, genero])






  return (
    
    <div>
      <Navbar/>
      <div className="container">
      <div className='otroPerfil'>
        <div className='margen'>
          <img src={fondo} alt='fondoSperfil' className='ImgSPerfil'/>
          <img src={imagen1} alt='Logo' className='LogoApp'/>
          <p className='NombreLogo'>NombreLogo</p>
          <img src={imagenPerfil} alt='imagen perfil' className='ImgPerfil'/>
          <p className='Nombre'>NombreUsuario</p>
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

            <ul>
              <li className='perforado1'><hr className='argolla'></hr></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
              <li className='perforado1'></li>
            </ul>

        </div>
      </div>


      <div className='Perfil'>
        <div className='margen'>
          <img src={fondo} alt='fondoSperfil' className='ImgSPerfil'/>
          <img src={imagen1} alt='Logo' className='LogoApp'/>
          <p className='NombreLogo'>NombreLogo</p>
          <img src={imagenPerfil} alt='imagen perfil' className='ImgPerfil'/>
          <p className='Nombre'>NombreUsuario</p>
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
        

        <ul>
              <li className='perforado2'><hr className='argolla'></hr></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
              <li className='perforado2'></li>
            </ul>
            </div>
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
