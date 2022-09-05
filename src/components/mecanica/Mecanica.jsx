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
    const [tema, setTema] = useState(null);
    const [componente, setComponente] = useState(null);

    const Clases = () => {
        setTema("Clase")
    }
    const Objetos = () => {
        setTema("Objeto")
    }
    const Metodos = () => {
        setTema("Metodo")
    }
    const Atributos = () => {
        setTema("Atributo")
    }

    const botonClase = <button onClick={Clases} className="botonClase">Clase</button>
    const botonObjetos = <button onClick={Objetos} className="botonObjetos">Objetos</button>
    const botonMetodos = <button onClick={Metodos} className="botonMetodos">Metodos</button>
    const botonAtributos = <button onClick={Atributos} className="botonAtributos">Atributos</button>
    const Eleccion = [botonClase, botonObjetos, botonMetodos, botonAtributos];

    const cambio = (fase, tema) => {
        if (tema === "Clase" && fase === 1) {
            <AnalizarClase/>
        }if (tema === "Clase" && fase === 2) {
            <AplicarClase/>
        }if (tema === "Clase" && fase === 3) {
            <ComprenderClase/>
        }if (tema === "Clase" && fase === 4) {
            <CrearClase/>
        }if (tema === "Clase" && fase === 5) {
            <EvaluarClase/>
        }if (tema === "Objeto" && fase === 1) {
            <AnalizarObjeto/>
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
            
    

  return (
    <div>
        {fase === null ? (Eleccion, cambio) : null}
      <h1>{Eleccion}</h1>
    </div>
  )
}

export default Mecanica
