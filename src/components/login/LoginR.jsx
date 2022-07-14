import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import "./Login.css"


export function Login() {
// Se crea una variable que guarda el estado de la variable user
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [error, seterror] = useState()
  
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('')
    try {
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        seterror("Correo invalido")
      }if (error.code === "auth/user-not-found") {
        seterror("Usuario no encontrado")
      }if (error.code === "auth/wrong-password") {
        seterror("Contraseña incorrecta")
      }
  }
  }

  const handleGoogleLogin = async () => {
      await loginWithGoogle()
      navigate('/')
  }

  const handleResetPassword = async () => {
    if(!user.email) return
      seterror("Ingrese un correo");
    
    try {
      await resetPassword(user.email)
      seterror("Se ha enviado un correo para restablecer la contraseña");
    } catch (error) {
      seterror("Correo invalido");
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        <h1>Iniciar sesión</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Tu correo</label>
        <input type="email" id="email" name="email" placeholder="youremail@correounivalle.edu.co" onChange={handleChange}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="******" onChange={handleChange}/>

        <button className="button" type="submit">Login</button>

        <a href="#!" onClick={handleResetPassword}>Olvide mi contraseña</a>
      
        </form>
        <p>No tengo una cuenta <Link to='/register'>Registrarme</Link></p>
        <button className="button" onClick={handleGoogleLogin}>Inicio con google</button>
      </div>
    </div>
  )
}