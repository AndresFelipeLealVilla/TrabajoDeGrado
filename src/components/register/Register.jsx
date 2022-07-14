import { useState } from "react"
import { useAuth } from "../../context/authContext";
import {Link,useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import "./Register.css"

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
    <div>
      {Fail && <p>{Fail}</p>}
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="youremail@correounivalle.edu.co" onChange={handleChange}/>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="******" onChange={handleChange}/>

      <button type="submit">Registrarse</button>
    </form>
    <p>Ya tengo una cuenta <Link to='/login'>Ir a login</Link></p>
    <Toaster/>
    </div>
  )
}