/* *************** Paquetes importados **************** */
import React, {useState} from 'react'
import { useAuth } from "../../context/authContext" 
import {getAuth} from 'firebase/auth'
import {Link} from 'react-router-dom'
import './Navbar.css'
import imagen from '../../img/Logo1.png'


const Navbar = () => {

/* ************ Datos de entrada ************* */
    const {logout} = useAuth()
    const user = getAuth().currentUser; 
    const [active, setActive] = useState("nav__menu");
    const [icon, setIcon] = useState("nav__toggler");


/* ************ Cerrar sesión ************* */
    const handleLogout = async () => {
        await logout()
    };



  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
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
        <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </nav>
  )
}

export default Navbar
