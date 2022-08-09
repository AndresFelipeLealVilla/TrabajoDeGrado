import React from 'react'
import imagen from '../../img/Logo1.png'
import './Navbar.css'

const Navbar = () => {
  return (
        <nav className='Navbar'>
            <img src={imagen} alt='' className='logoNavbar' />
            <div className='Container'>
                <span id='Texto'>Perfil</span>
                <div className='Menu'>
                    <div className='Opcion'>Inicio</div>
                    <div className='Opcion'>Nosotros</div>
                    <div className='Opcion'>Servicios</div>
                    <div className='Opcion'>Contacto</div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
