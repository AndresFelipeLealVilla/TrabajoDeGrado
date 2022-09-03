/* *************** Paquetes importados **************** */
import React, {useState} from 'react'
import { useAuth } from "../../context/authContext" 
import {getAuth} from 'firebase/auth'
import {Link} from 'react-router-dom'
import './Navbar.css'
import imagen from '../../img/Logo1.png'
import TotalProgress from "../totalProgress/TotalProgress"
import NClases from '../../img/imgTrofeo/NClases.png'
import NObjetos from '../../img/imgTrofeo/NObjetos.png'
import NMetodos from '../../img/imgTrofeo/NMetodos.png'
import NAtributos from '../../img/imgTrofeo/NAtributos.png'
import NMedalla from '../../img/imgMedalla/NMedalla.jpg'
import Clases from '../../img/imgTrofeo/Clases.png'
import Objetos from '../../img/imgTrofeo/Objetos.png'
import Metodos from '../../img/imgTrofeo/Metodos.png'
import Atributos from '../../img/imgTrofeo/Atributos.png'


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
      setActive("nav__menu");
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
      
      <ul className='Trofeos'>
        <li className='item'>
        <img src={NMedalla} alt='NAtributos' className='Trofeo'/>
        </li>
        <li className='item'>
          <img src={NClases} alt='NClases' className='Trofeo'/>
        </li>
        <li className='item'>
          <img src={NObjetos} alt='NObjetos' className='Trofeo'/>
        </li>
        <li className='item'>
          <img src={NMetodos} alt='NMetodos' className='Trofeo'/>
        </li>
        <li className='item'>
          <img src={NAtributos} alt='NAtributos' className='Trofeo'/>
        </li>
      </ul>
      
        
        
        
    </nav>
  )
}

export default Navbar
