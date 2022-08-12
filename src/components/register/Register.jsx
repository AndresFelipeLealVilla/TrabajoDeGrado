/**************** Paquetes importados *****************/
import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import { getFirestore, collection, addDoc} from "firebase/firestore";
import {app} from '../../Firebase'
import {getAuth, updateProfile} from 'firebase/auth'
import './Register.css'
import imagen from '../../img/Logo1.png'


export function Register() {
//Usar importarDatos

/************* Datos de entrada **************/
  const [user, setUser] = useState({
    Nombre: '',
    Apellido: '',
    NombreUsuario: '',
    Edad: '',
    Email: '',
    Password: '',
    Genero: '',
    Puntos: '',
  })

/** ************* Context ************** */
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [Fail, setFail] = useState()
  const db = getFirestore(app)
  const auth = getAuth();
  
  
/* ****** Actualizar datos de usuario ****** */
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

/* ********* Registrar usuario ******** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail('')
    try {
    // verificar que todos los datos esten llenos
    if(user.Nombre === '' || user.Apellido === '' || user.NombreUsuario === '' || user.Edad === '' || user.Email === '' || user.Password === '' || user.Genero === ''){
      setFail('Todos los campos son obligatorios')
      toast.error('Todos los campos son obligatorios')
    }else{
      await signup(user.Email, user.Password)
      updateProfile(auth.currentUser, {
        displayName: user.NombreUsuario})
      e.preventDefault();
      try {
        user.Password = '';
        await addDoc(collection(db, 'Estudiantes'),{...user})
      } catch (error) {
          console.log(error)
        }
        setUser({...user});
      toast.success('Usuario creado')
      setTimeout( ()  => {navigate('/')}, 2000);}
    } catch (error) {
      console.log(error.code)
      if (error.code === "auth/invalid-email") {
        setFail("Correo invalido")
        toast.error("Correo invalido")
       
      }if (error.code === "auth/email-already-in-use") {
        setFail("Correo ya registrado")
        toast.error("Correo ya registrado")
       
      }if (error.code === "auth/weak-password") {
        setFail("Contraseña muy debil")
        toast.error("Contraseña muy debil")
    
      }if (error.code === "auth/internal-error") {
        setFail("Datos invalidos")
        toast.error("Datos invalidos")
        
      }if (error.code === "auth/missing-email"){
        setFail("Correo invalido")
        toast.error("Correo invalido")
      
      }if (error.code === "auth/admin-restricted-operation"){
        setFail("Usuario no autorizado")
        toast.error("Usuario no autorizado")
      
      }    
    }
  }

  // exportar user para que se pueda usar en el componente

/* ********* Render ******** */
  return (
    
    <div className="container">
      <div className='formularioRegister'>
        <img src={imagen} alt='' className='logo1'/>
        {Fail && <p>{Fail}</p>}
        <h1 className="RegisterNombre">Registro</h1>
        <form onSubmit={handleSubmit}>
          <input name="Nombre" type="name"  onChange={handleChange}  placeholder="  Nombre"/>
          <input name="Apellido" type="lastname" onChange={handleChange} placeholder="  Apellido"/>
          <input name="NombreUsuario" type="userName" onChange={handleChange} placeholder="  Nombre de usuario"/>
          <input name="Edad" type="age" onChange={handleChange} placeholder="  Edad"/>
          <input type="Email" id="Email" name="Email" placeholder="  Correo electrónico" onChange={handleChange}/>
          <input type="Password" name="Password" id="Password" placeholder="  Contraseña" onChange={handleChange}/>

          <select id="Genero" name="Genero" onChange={handleChange}>
            <option value=" " id=" "> Selecciona</option>
            <option value="Hombre" id="Hombre">Masculino</option>
            <option value="Hombre" id="Mujer">Femenino</option>
            <option value="NoDefinido" id="NoDefinido">No Definido</option>
          </select>

          <button type="submit" className="buttonRegister">Registrarse</button>
        </form>
        <hr className="lineaRegister"/>
        <p> <Link to='/login'>¿Ya tienes una cuenta?</Link></p>
        <Toaster/>
      </div>
    </div>
  )
}
