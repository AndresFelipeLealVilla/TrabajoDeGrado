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
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [Fail, setFail] = useState()

/* ****** Actualizar datos de usuario ****** */
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

/* ********* Iniciar sesion ******** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail('')
    try { 
      await login(user.email, user.password)
      toast.success('Usuario logeado')
      setTimeout( ()  => {navigate('/')}, 2000);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setFail("Correo invalido")
        toast.error("Correo invalido")
      }if (error.code === "auth/user-not-found") {
        setFail("Usuario no encontrado")
        toast.error("Usuario no encontrado")
      }if (error.code === "auth/wrong-password") {
        setFail("Contraseña incorrecta")
        toast.error("Contraseña incorrecta")
      }if (error.code === "auth/internal-error") {
        setFail("Datos invalidos")
        toast.error("Datos invalidos")
      }
    }
  }

/* ********* Iniciar sesion con Google ******** */
  const handleGoogleLogin = async () => {
      await loginWithGoogle()
      navigate('/')
  }

/* ********* Reiniciar contraseña ******** */
  const handleResetPassword = async () => {
    if(!user.email) return toast.error("Ingrese un correo");
    setFail('Ingrese un correo')
    try {
      await resetPassword(user.email)
      setFail("Se ha enviado un correo para restablecer la contraseña");
      toast.success("Se ha enviado un correo para restablecer la contraseña");
    } catch (error) {
      setFail("Correo invalido");
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
      <button className="buttonGoogle" onClick={handleGoogleLogin}>Inicio con google</button>
      </div>
    </div>
  )
}
/* ********* Fin del Login ******** */