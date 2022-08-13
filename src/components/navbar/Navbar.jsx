import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../../context/authContext" 
import {getAuth} from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import {app} from '../../Firebase'
import {Link} from 'react-router-dom'
import './Navbar.css'
import imagen from '../../img/Logo1.png'
import ImagenHombre from '../../img/imgProfile/Hombre.png'
import ImagenMujer from '../../img/imgProfile/Mujer.png'
import ImagenNoDefinida from '../../img/imgProfile/Silueta.png'


const Navbar = () => {

    const {logout} = useAuth()
    const user = getAuth().currentUser;
    const email = getAuth().currentUser.email;
    
    const [genero, setGenero] = useState ('')

    const handleLogout = async () => {
        await logout()
    }; 
    const db = getFirestore(app)
    const datosEstudiante = collection(db, "Estudiantes");
    const [imagenPerfil, setImagenPerfil] = useState('')

    useEffect (() => {
    const obtenerEstudiante = async () => {
        const qu = query(datosEstudiante, where("Email", "==", email));
        const querySnapshot = await getDocs(qu);
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.Correo, " => ", doc.data());
        setGenero(doc.data().Genero)
        console.log(genero)
        if (genero === 'Hombre') {
            setImagenPerfil(ImagenHombre)
            console.log('es hombre')
        } if (genero === 'Mujer') {
            setImagenPerfil(ImagenMujer)
            console.log('es mujer')
        } if(genero === 'NoDefinido'){
            setImagenPerfil(ImagenNoDefinida)
            console.log('no definido')
        }
    }
        );
    }
    obtenerEstudiante();
},[email, datosEstudiante, genero])

const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
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
            <img src={imagenPerfil} alt="logo" className="nav__brand"/><span className='nombre'>{user.displayName}</span>   
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
