import React, {useState} from 'react'
import { getAuth } from 'firebase/auth'
import './Profile.css'
import {app} from '../../Firebase'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import {Toaster, toast} from 'react-hot-toast'

export function Profile() {

  const email = getAuth().currentUser.email;
  const db = getFirestore(app)

  const valorInicial = {
    Correo: '',
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Puntos: '',
  }

  const [estudiante, setEstudiante] = useState({valorInicial});

const handleInputChange = async (e) => {
  const {name, value} = e.target;
  setEstudiante({...estudiante, [name]: value})
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      estudiante.Correo = email;
      estudiante.Puntos = 0;
      await addDoc(collection(db, 'Estudiantes'),{...estudiante})
       } catch (error) {
      console.log(error)
    }
    setEstudiante({...valorInicial});
  }

  return (
    <div>
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
