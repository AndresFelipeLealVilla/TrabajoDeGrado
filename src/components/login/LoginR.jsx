import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import "./Login.css"


export function Login() {
// Se crea una variable que guarda el estado de la variable user
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [Fail, setFail] = useState()
  
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail('')
    
    try { 
      await login(user.email, user.password)
      toast.success('Usuario logeado')
      setTimeout( ()  => {navigate('/')}, 3000);

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

  const handleGoogleLogin = async () => {
      await loginWithGoogle()
      navigate('/')
  }

  const handleResetPassword = async () => {
    if(!user.email) return
      setFail("Ingrese un correo");
    
    try {
      await resetPassword(user.email)
      setFail("Se ha enviado un correo para restablecer la contraseña");
    } catch (error) {
      setFail("Correo invalido");
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        <h1>Iniciar sesión</h1>
        {Fail && <p>{Fail}</p>}
        
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
      <Toaster/>
    </div>

  )
}