import React, {useState} from 'react'
import ComprenderClase from '../Bloom/1comprender/ComprenderClase'
import AplicarClase from '../Bloom/2aplicar/AplicarClase'
import AnalizarClase from '../Bloom/3analizar/AnalizarClase'
import EvaluarClase from '../Bloom/4evaluar/EvaluarClase'
import CrearClase from '../Bloom/5crear/CrearClase'

import ComprenderObjeto from '../Bloom/1comprender/ComprenderObjeto'
import AplicarObjeto from '../Bloom/2aplicar/AplicarObjeto'
import AnalizarObjeto from '../Bloom/3analizar/AnalizarObjeto'
import EvaluarObjeto from '../Bloom/4evaluar/EvaluarObjeto'
import CrearObjeto from '../Bloom/5crear/CrearObjeto'

import ComprenderMetodo from '../Bloom/1comprender/ComprenderMetodo'
import AplicarMetodo from '../Bloom/2aplicar/AplicarMetodo'
import AnalizarMetodo from '../Bloom/3analizar/AnalizarMetodo'
import EvaluarMetodo from '../Bloom/4evaluar/EvaluarMetodo'
import CrearMetodo from '../Bloom/5crear/CrearMetodo'

import ComprenderAtributo from '../Bloom/1comprender/ComprenderAtributo'
import AplicarAtributo from '../Bloom/2aplicar/AplicarAtributo'
import AnalizarAtributo from '../Bloom/3analizar/AnalizarAtributo'
import EvaluarAtributo from '../Bloom/4evaluar/EvaluarAtributo'
import CrearAtributo from '../Bloom/5crear/CrearAtributo'
import Positions from '../PositionsTable/Positions'


function Mecanica() {
    const [fase, setFase] = useState(0);
    const [tema, setTema] = useState('Clases');

    const Clases = () => {
        setTema("Clases")
        setEvaluador(1)
        contador()
    }
    const Objetos = () => {
        setTema("Objetos")
        setEvaluador(1)
        contador()
    }
    const Metodos = () => {
        setTema("Metodos")
        setEvaluador(1)
        contador()
    }
    const Atributos = () => {
        setTema("Atributos")
        setEvaluador(1)
        contador()
    }



    const botonClase = <button onClick={Clases} className="botonSelector">Clase</button>
    const botonObjetos = <button onClick={Objetos} className="botonSelector">Objetos</button>
    const botonMetodos = <button onClick={Metodos} className="botonSelector">Metodos</button>
    const botonAtributos = <button onClick={Atributos} className="botonSelector">Atributos</button>
    const Eleccion = [botonClase, botonObjetos, botonMetodos, botonAtributos];

    const [evaluador, setEvaluador] = useState(0)


    const contador = () => {
        if (fase < 5) {
            setFase(fase + 1);
            <Positions/>;
        } else {
            setFase(0)
        }
    }
    
    
    

  return (
    <div>
        
        {fase === 0 ? <h1>{Eleccion}</h1>:
        (tema === "Clases" && fase === 1 ? <ComprenderClase evento={contador}/> : 
        (tema === "Clases" && fase === 2 ? <AplicarClase evento={contador} /> : 
        (tema === "Clases" && fase === 3 ? <AnalizarClase evento={contador} />:
        (tema === "Clases" && fase === 4 ? <EvaluarClase evento={contador} /> : 
        (tema === "Clases" && fase === 5 ? <CrearClase evento={contador} /> :

        (tema === "Objetos" && fase === 1 ? <ComprenderObjeto evento={contador} /> :
        (tema === "Objetos" && fase === 2 ? <AplicarObjeto evento={contador} /> : 
        (tema === "Objetos" && fase === 3 ? <AnalizarObjeto evento={contador} />: 
        (tema === "Objetos" && fase === 4 ? <EvaluarObjeto evento={contador} /> :
        (tema === "Objetos" && fase === 5 ? <CrearObjeto evento={contador} /> : 
         
        (tema === "Metodos" && fase === 1 ? <ComprenderMetodo evento={contador} /> :
        (tema === "Metodos" && fase === 2 ? <AplicarMetodo evento={contador} /> :
        (tema === "Metodos" && fase === 3 ? <AnalizarMetodo evento={contador} /> : 
        (tema === "Metodos" && fase === 4 ? <EvaluarMetodo evento={contador} /> :
        (tema === "Metodos" && fase === 5 ? <CrearMetodo evento={contador} /> : 
         
        (tema === "Atributos" && fase === 1 ? <EvaluarAtributo evento={contador} /> :
        (tema === "Atributos" && fase === 2 ? <AplicarAtributo evento={contador} /> :
        (tema === "Atributos" && fase === 3 ? <ComprenderAtributo evento={contador} /> : 
        (tema === "Atributos" && fase === 4 ? <AnalizarAtributo evento={contador} /> :
        (tema === "Atributos" && fase === 5 ? <CrearAtributo evento={contador} /> : null ))))))))))))))))))))}
        
    </div>
  )
}

export default Mecanica
