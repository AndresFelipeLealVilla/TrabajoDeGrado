import React, {useState} from 'react'
import AnalizarClase from '../Bloom/analizar/AnalizarClase'
import AplicarClase from '../Bloom/aplicar/AplicarClase'
import ComprenderClase from '../Bloom/comprender/ComprenderClase'
import CrearClase from '../Bloom/crear/CrearClase'
import EvaluarClase from '../Bloom/evaluar/EvaluarClase'

import AnalizarObjeto from '../Bloom/analizar/AnalizarObjeto'
import AplicarObjeto from '../Bloom/aplicar/AplicarObjeto'
import ComprenderObjeto from '../Bloom/comprender/ComprenderObjeto'
import CrearObjeto from '../Bloom/crear/CrearObjeto'
import EvaluarObjeto from '../Bloom/evaluar/EvaluarObjeto'

import AnalizarMetodo from '../Bloom/analizar/AnalizarMetodo'
import AplicarMetodo from '../Bloom/aplicar/AplicarMetodo'
import ComprenderMetodo from '../Bloom/comprender/ComprenderMetodo'
import CrearMetodo from '../Bloom/crear/CrearMetodo'
import EvaluarMetodo from '../Bloom/evaluar/EvaluarMetodo'

import AnalizarAtributo from '../Bloom/analizar/AnalizarAtributo'
import AplicarAtributo from '../Bloom/aplicar/AplicarAtributo'
import ComprenderAtributo from '../Bloom/comprender/ComprenderAtributo'
import CrearAtributo from '../Bloom/crear/CrearAtributo'
import EvaluarAtributo from '../Bloom/evaluar/EvaluarAtributo'

function Mecanica() {
    const [fase, setFase] = useState(0);
    const [tema, setTema] = useState('Clases');

    const Clases = () => {
        setTema("Clases")
        contador()
    }
    const Objetos = () => {
        setTema("Objetos")
        contador()
    }
    const Metodos = () => {
        setTema("Metodos")
        contador()
    }
    const Atributos = () => {
        setTema("Atributos")
        contador()
    }



    const botonClase = <button onClick={Clases} className="botonSelector">Clase</button>
    const botonObjetos = <button onClick={Objetos} className="botonSelector">Objetos</button>
    const botonMetodos = <button onClick={Metodos} className="botonSelector">Metodos</button>
    const botonAtributos = <button onClick={Atributos} className="botonSelector">Atributos</button>
    const Eleccion = [botonClase, botonObjetos, botonMetodos, botonAtributos];

    

    const contador = () => {
        if (fase < 5) {
            setFase(fase + 1)
        } else {
            setFase(0)
        }
    }
            
    

  return (
    <div>
        {fase === 0 ? <h1>{Eleccion}</h1>: 
        (tema === "Clases" && fase === 1 ? <ComprenderClase/>  : 
        (tema === "Clases" && fase === 2 ? <AplicarClase/> : 
        (tema === "Clases" && fase === 3 ? <AnalizarClase/>: 
        (tema === "Clases" && fase === 4 ? <CrearClase/> : 
        (tema === "Clases" && fase === 5 ? <EvaluarClase/> : 
        (tema === "Objetos" && fase === 1 ? <AnalizarObjeto/> : 
        (tema === "Objetos" && fase === 2 ? <AplicarObjeto/> : 
        (tema === "Objetos" && fase === 3 ? <ComprenderObjeto/> : 
        (tema === "Objetos" && fase === 4 ? <CrearObjeto/> : 
        (tema === "Objetos" && fase === 5 ? <EvaluarObjeto/> : 
        (tema === "Metodos" && fase === 1 ? <AnalizarMetodo/> : 
        (tema === "Metodos" && fase === 2 ? <AplicarMetodo/> : 
        (tema === "Metodos" && fase === 3 ? <ComprenderMetodo/> : 
        (tema === "Metodos" && fase === 4 ? <CrearMetodo/> : 
        (tema === "Metodos" && fase === 5 ? <EvaluarMetodo/> : 
        (tema === "Atributos" && fase === 1 ? <AnalizarAtributo/> : 
        (tema === "Atributos" && fase === 2 ? <AplicarAtributo/> : 
        (tema === "Atributos" && fase === 3 ? <ComprenderAtributo/> : 
        (tema === "Atributos" && fase === 4 ? <CrearAtributo/> : 
        (tema === "Atributos" && fase === 5 ? <EvaluarAtributo/> : null ))))))))))))))))))))}
            
      
    </div>
  )
}

export default Mecanica
