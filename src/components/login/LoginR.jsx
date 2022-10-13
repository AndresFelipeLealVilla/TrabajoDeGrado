/* *************** Paquetes importados **************** */
import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import './Login.css'
import imagen from '../../img/Logo1.png'


export function Login() {

/* ************ Datos de entrada ************* */
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

/** ************* Context ************** */
  const { login, resetPassword } = useAuth()
  const navigate = useNavigate()

/* ****** Actualizar datos de usuario ****** */
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

/* ********* Iniciar sesion ******** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await login(user.email, user.password)
      toast.success('Usuario logeado')
      setTimeout( ()  => {navigate('/')}, 2000);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error("Correo invalido")
      }if (error.code === "auth/user-not-found") {
        toast.error("Usuario no encontrado")
      }if (error.code === "auth/wrong-password") {
        toast.error("Contraseña incorrecta")
      }if (error.code === "auth/internal-error") {
        toast.error("Datos invalidos")
      }
    }
  }

/* ********* Reiniciar contraseña ******** */
  const handleResetPassword = async () => {
    if(!user.email) return toast.error("Ingrese un correo");
    try {
      await resetPassword(user.email)
      toast.success("Se ha enviado un correo para restablecer la contraseña");
    } catch (error) {
      toast.error("Correo invalido");
    }
  }

/* ********* Render ******** */
  return (
    <div className="container">
      <div className="formularioLogin">
      <img src={imagen} alt='' className='logo1' />
        <h1 className="LoginNombre">Nombre Bot</h1>

        <div className="Login">
          <form onSubmit={handleSubmit}>
            <input type="email" id="email" name="email" placeholder="  Correo electrónico" onChange={handleChange}/>
            <input type="password" name="password" id="password" placeholder="  Contraseña" onChange={handleChange}/>
            <button className="buttonLogin" type="submit">Iniciar Sesión</button>
            <hr className="lineaLogin"/>
            <p><a href="#!" onClick={handleResetPassword}>¿Olvidaste tu contraseña?</a></p>
        </form>
      </div>
        <Toaster/>
      <p><Link to='/register' className="a">¿No tienes una cuenta?</Link></p>
      </div>
    </div>
  )
}
/* ********* Fin del Login ******** */