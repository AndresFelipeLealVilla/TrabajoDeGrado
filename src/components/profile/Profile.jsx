/* *************** Paquetes importados **************** */
import React, { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import Navbar from "../navbar/Navbar"
import imagen1 from '../../img/Logo1.png'
import fondo from '../../img/imgProfile/fondoPerfil.PNG'
import hombre from '../../img/imgProfile/HombreG.PNG'
import mujer from '../../img/imgProfile/MujerG.PNG'
import silueta from '../../img/imgProfile/SiluetaG.PNG'

import NClases from '../../img/imgTrofeo/NClases.png'
import NObjetos from '../../img/imgTrofeo/NObjetos.png'
import NMetodos from '../../img/imgTrofeo/NMetodos.png'
import NAtributos from '../../img/imgTrofeo/NAtributos.png'
import Clases from '../../img/imgTrofeo/Clases.png'
import Objetos from '../../img/imgTrofeo/Objetos.png'
import Metodos from '../../img/imgTrofeo/Metodos.png'
import Atributos from '../../img/imgTrofeo/Atributos.png'


export function Profile(props) {

/* ************ Datos de entrada ************* */
  const db = getFirestore(app)
  const Usuario = getAuth().currentUser;
  const datosEstudiante = collection(db, "Estudiantes");
  const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
  const [activador, setActivador] = useState(0)
  
  const [estudiante, setEstudiante] = useState({
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Email: Usuario.email,
    Password: '',
    Genero: '',
    Puntos: 0,
    TrofeoClase: 0,
    TrofeoObjeto: 0,
    TrofeoMetodo: 0,
    TrofeoAtributo: 0,
  });

  const [obtId, setObtId] = useState('')

/* ************ Traer datos de la base de datos ************* */
const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((documento) => {
    setEstudiante(documento.data())
    setObtId(documento.id)
    console.log(documento.data())
    console.log(documento.id)
    console.log(obtId)
  }
  );};

/* ************  ************* */
  const handleInputChange = async (e) => {
    const {name, value} = e.target;
    setEstudiante({...estudiante, [name]: value}) 
    
  };

  /* Actualizar los datos de un estudiante en firestore */
  const ActualizarDatos = async () => {
    obtenerEstudiante();
    console.log(obtId);
      await updateDoc(doc(db, "Estudiantes", obtId), {...estudiante});
   }

/* ************* Activar la opcion de actualizar ************* */
const activarActualizacion = () => {
  setActivador(1)
}

/* ************ Traer datos al cargar el perfil ************* */    
  useEffect (() => {
      obtenerEstudiante();
      ActualizarDatos();    
},[activador]);

/* ************ Return del perfil ************* */
  return (    
    <div className='ContainerProfile'>
      <Navbar/>
      <div className='margenExterior'>
        <div className='margenInterior'>

          <img src={fondo} alt='fondoSperfil' className='fondo'/>

          <img src={imagen1} alt='Logo' className='LogoApp'/>
          <p className='Nombre-Logo'>Blip</p>

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
            </tbody>
          </table>

          <img src={estudiante.TrofeoClase === 1 ? Clases : NClases} alt='NClases' className='TrofeoClase'/>
          <img src={estudiante.TrofeoObjeto === 1 ? Objetos : NObjetos} alt='NObjetos' className='TrofeoObjeto'/>
          <img src={estudiante.TrofeoMetodo === 1 ? Metodos : NMetodos} alt='NMetodos' className='TrofeoMetodo'/>
          <img src={estudiante.TrofeoAtributo === 1 ? Atributos : NAtributos} alt='NAtributos' className='TrofeoAtributo'/>

          <button className='buttonEdit' onClick={activarActualizacion}>Editar</button>
        </div>
      </div>

        {activador === 0 ? null : 
          <div>
            <form className='FormularioActualizacion'>
              <input name="Email" type="Email" placeholder=" Email" onChange={handleInputChange} value={Usuario.email} readOnly/>
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
