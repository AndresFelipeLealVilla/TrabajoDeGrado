import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import "./Register.css"

export function Register() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, seterror] = useState()
  
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('')
    try {
      await signup(user.email, user.password)
      navigate('/profile')
    } catch (error) {
      console.log(error.code)
      if (error.code === "auth/invalid-email") {
        seterror("Correo invalido")
      }if (error.code === "auth/email-already-in-use") {
        seterror("Correo ya registrado")
      }if (error.code === "auth/weak-password") {
        seterror("Contraseña muy debil")
      }if (error.code === "auth/internal-error") {
        seterror("Datos invalidos")
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

      <button type="submit">Registrarse</button>
    </form>
    <p>Ya tengo una cuenta <Link to='/login'>Ir a login</Link></p>
    </div>
  )
}