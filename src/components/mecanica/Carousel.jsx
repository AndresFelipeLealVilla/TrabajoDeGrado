import React, {useState} from 'react'
import imagen1 from '../../img/CaroulselIMG/Imagen1.png'
import imagen2 from '../../img/CaroulselIMG/Imagen2.png'
import imagen3 from '../../img/CaroulselIMG/Imagen3.png'
import imagen4 from '../../img/CaroulselIMG/Imagen4.png'

import './Mecanica.css'

function Carousel() {

  const Imagen1 = <img className='imagen1' src={imagen1} alt='imagen1' />
  const Imagen2 = <img className='imagen2' src={imagen2} alt='imagen2' />
  const Imagen3 = <img className='imagen3' src={imagen3} alt='imagen3' />
  const Imagen4 = <img className='imagen4' src={imagen4} alt='imagen4' />

const recorrido = [Imagen1, Imagen2, Imagen3, Imagen4, 'imagen5', 'imagen6', 'imagen7', 'imagen8', 'imagen9', 'imagen10']
const [Activador, setActivador]  = useState(0); 
const [Imagen, setImagen] = useState(null)

const Atras = () => {
    console.log('atras')
    setActivador(Activador - 1)
    setImagen(recorrido[Activador])
}

const Siguiente = () => {
    console.log('adelante')
    setActivador(Activador + 1)
    setImagen(recorrido[Activador])
}


  return (
    <div style={{
      backgroundImage: Imagen}}>
      <button className='Atras' onClick={Atras}>Atras</button>
      <button className='Siguiente' onClick={Siguiente}>Siguiente</button>
      {Activador === 1 ? recorrido[0] : 
      (Activador === 2 ? recorrido[1] :
      (Activador === 3 ? recorrido[2] :
      (Activador === 4 ? recorrido[3] :
      (Activador === 5 ? 'imagen5' : 
      (Activador === 6 ? 'imagen6' :
      (Activador === 7 ? 'imagen7' :
      (Activador === 8 ? 'imagen8' :
      (Activador === 9 ? 'imagen9' : setActivador(1)))))))))}

    </div>
  )
}

export default Carousel