import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import './Register.css'
import imagen from '../../img/Logo1.png'

export function Register() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { signup } = useAuth()
  const navigate = useNavigate()
  const [Fail, setFail] = useState()
  
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail('')
    try {
      await signup(user.email, user.password)
      toast.success('Usuario creado')
      setTimeout( ()  => {navigate('/profile')}, 2000);
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
        
      }
      
  }
  
  }

  return (
    <div className="container">
      <div className='formularioRegister'>
      <img src={imagen} className='logo1'/>
      {Fail && <p>{Fail}</p>}
      <h1 className="RegisterNombre">Registro</h1>
      <form onSubmit={handleSubmit}>
      <input type="email" id="email" name="email" placeholder="  Correo electrónico" onChange={handleChange}/>
      <input type="password" name="password" id="password" placeholder="  Contraseña" onChange={handleChange}/>

      <button type="submit" className="buttonRegister">Registrarse</button>
    </form>
    <p> <Link to='/login'>¿Ya tienes una cuenta?</Link></p>
    <Toaster/>
    </div>
    </div>
  )
}