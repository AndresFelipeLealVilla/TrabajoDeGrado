import React from 'react'
import './TotalProgress.css'

import NClases from '../../img/imgTrofeo/NClases.png'
import NObjetos from '../../img/imgTrofeo/NObjetos.png'
import NMetodos from '../../img/imgTrofeo/NMetodos.png'
import NAtributos from '../../img/imgTrofeo/NAtributos.png'
import NMedalla from '../../img/imgMedalla/NMedalla.jpg'
import Clases from '../../img/imgTrofeo/Clases.png'
import Objetos from '../../img/imgTrofeo/Objetos.png'
import Metodos from '../../img/imgTrofeo/Metodos.png'
import Atributos from '../../img/imgTrofeo/Atributos.png'



export function TotalProgress() {
  return (
    <div className='ProgresoTotal'>
      <img src={NMedalla} alt='NAtributos' className='Medalla'/>
      <ul className='Trofeos'>
        
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
      
    </div>
    
  )
}

export default TotalProgress;