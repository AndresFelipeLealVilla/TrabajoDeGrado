/* *************** Paquetes importados **************** */
import React, {useState} from 'react'
import { useAuth } from "../../context/authContext" 
import {getAuth} from 'firebase/auth'
import {Link} from 'react-router-dom'
import './Navbar.css'
import imagen from '../../img/Logo1.png'


const Navbar = (props) => {
/* ************ Definir variables de imagenes ************* */

/* ************ Datos de entrada ************* */
    const {logout} = useAuth()
    const user = getAuth().currentUser; 
    const [active, setActive] = useState("nav__menu");


/* ************ Cerrar sesión ************* */
    const handleLogout = async () => {
        await logout()
    };

  return (
    <nav className="NavBar">
        <ul className='nav__brandBlock'>
            <img src={imagen} alt="logo" className="nav__brand"/>
            <span className='nombre'>{user.displayName}</span>
        </ul>
        <ul className={active}>
            <li className="nav__item"><Link to='/' className='a'>Inicio</Link> </li>
            <li className="nav__item"><Link to='/profile' className='a'>Perfil</Link> </li>
            <li className="nav__item"><Link to='/' className='a' onClick={handleLogout}>Salir</Link> </li>
        </ul>
    </nav>
  )
}




export default Navbar
