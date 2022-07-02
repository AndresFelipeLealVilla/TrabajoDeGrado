import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {useNavigate} from 'react-router-dom'


export function Login() {
// Se crea una variable que guarda el estado de la variable user
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { login } = useAuth()
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
      console.log(error.code)
      if (error.code === "auth/invalid-email") {
        seterror("Correo invalido")
      }if (error.code === "auth/user-not-found") {
        seterror("Usuario no encontrado")
      }if (error.code === "auth/wrong-password") {
        seterror("Contraseña incorrecta")
      }
  }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="youremail@correounivalle.edu.co" onChange={handleChange}/>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="******" onChange={handleChange}/>

      <button type="submit">Login</button>
    </form>
    </div>
  )
}