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
import { render } from 'react-dom'

function Mecanica() {
    const [fase, setFase] = useState(2);
    const [tema, setTema] = useState('Clases');
    const [componente, setComponente] = useState(null);

    const Clases = () => {
        setTema("Clases")
        cambio(tema, fase)
        setFase(2)
    }
    const Objetos = () => {
        setTema("Objetos")
        cambio(tema, fase)
    }
    const Metodos = () => {
        setTema("Metodos")
        cambio(tema, fase)
    }
    const Atributos = () => {
        setTema("Atributos")
        cambio(tema, fase)
    }

    const cambio = (fase, tema) => {
        if (tema === "Clases" && fase === 1) {
            return (
            <AnalizarClase/>)
            
        }if (tema === "Clases" && fase === 2) {
            render(
            <AplicarClase/>)

        }if (tema === "Clases" && fase === 3) {
            render(
            <ComprenderClase/>)
        }if (tema === "Clase" && fase === 4) {
            render(
            <CrearClase/>)
        }if (tema === "Clase" && fase === 5) {
            render(
            <EvaluarClase/>)
        }if (tema === "Objeto" && fase === 1) {
            render(
            <AnalizarObjeto/>)
        }if (tema === "Objeto" && fase === 2) {
            <AplicarObjeto/>
        }if (tema === "Objeto" && fase === 3) {
            <ComprenderObjeto/>
        }if (tema === "Objeto" && fase === 4) {
            <CrearObjeto/>
        }if (tema === "Objeto" && fase === 5) {
            <EvaluarObjeto/>
        }if (tema === "Metodo" && fase === 1) {
            <AnalizarMetodo/>
        }if (tema === "Metodo" && fase === 2) {
            <AplicarMetodo/>
        }if (tema === "Metodo" && fase === 3) {
            <ComprenderMetodo/>
        }if (tema === "Metodo" && fase === 4) {
            <CrearMetodo/>
        }if (tema === "Metodo" && fase === 5) {
            <EvaluarMetodo/>
        }if (tema === "Atributo" && fase === 1) {
            <AnalizarAtributo/>
        }if (tema === "Atributo" && fase === 2) {
            <AplicarAtributo/>
        }if (tema === "Atributo" && fase === 3) {
            <ComprenderAtributo/>
        }if (tema === "Atributo" && fase === 4) {
            <CrearAtributo/>
        }if (tema === "Atributo" && fase === 5) {
            <EvaluarAtributo/>
        }

    }


    const botonClase = <button onClick={Clases} className="botonClase">Clase</button>
    const botonObjetos = <button onClick={Objetos} className="botonObjetos">Objetos</button>
    const botonMetodos = <button onClick={Metodos} className="botonMetodos">Metodos</button>
    const botonAtributos = <button onClick={Atributos} className="botonAtributos">Atributos</button>
    const Eleccion = [botonClase, botonObjetos, botonMetodos, botonAtributos];

    

    const contador = () => {
        if (fase < 5) {
            setFase(fase + 1)
        } else {
            setFase(1)
        }
    }
            
    

  return (
    <div>
        {tema === "Clases" && fase === 1 ? <AnalizarClase/> : 
        (tema === "Clases" && fase === 2 ? <AplicarClase/> : 
        (tema === "Clases" && fase === 3 ? <ComprenderClase/> : 
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
        (tema === "Atributos" && fase === 5 ? <EvaluarAtributo/> : null )))))))))))))))))))}
            
      <h1>{Eleccion}</h1>
    </div>
  )
}

export default Mecanica
