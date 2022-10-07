import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Analizar.css'
import { useStopwatch } from "react-timer-hook";
import swal from 'sweetalert'
import preguntaAnalizarObjeto from '../../../img/taxonomia/3Analizar/AnalizarObjeto.PNG'
import img1 from '../../../img/taxonomia/3Analizar/1.PNG'
import img2 from '../../../img/taxonomia/3Analizar/2.PNG'
import img3 from '../../../img/taxonomia/3Analizar/3.PNG'
import img4 from '../../../img/taxonomia/3Analizar/4.PNG'
import img5 from '../../../img/taxonomia/3Analizar/5.PNG'
import img6 from '../../../img/taxonomia/3Analizar/6.PNG'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'


/* Creación drag and drop */

const itemsFromBackend = [
  { id: "Primero", content: <img src={img1} alt="img1"  className="img1"/> },
  { id: "Segundo", content: <img src={img1} alt="img1"  className="img2"/> },
  { id: "Tercero", content: <img src={img1} alt="img1"  className="img3"/> },
  { id: "Cuarto", content: <img src={img1} alt="img1"  className="img4"/> },
  { id: "Quinto", content: <img src={img1} alt="img1"  className="img5"/> },
  { id: "Sexto", content: <img src={img1} alt="img1"  className="img6"/> }

];

const columnsFromBackend = {
  1: {
    name: "Opciones",
    items: itemsFromBackend
  },
  2: {
    name: "Objetos Aceptados",
    items: []
  },

};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function AnalizarObjeto(props) {


  /* Temporizador */

const stopwatchOffset = new Date();
stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
const {
  seconds,
  pause,
  isRunning,

} = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });
const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;

  const [puntos, setPuntos] = useState(0);
  const [state, setState] = useState(40)

  const mensajeCorrecto = (points) => {
    swal({
      icon: "success",
      title: "¡Gran Trabajo!",

      text: "Obtuviste: " + points + " puntos y tu tiempo es de: " + secondTime + " segundos",
      button: "OK",
    });

  };

  const mensajeIncorrecto = () => {
    swal({
      icon: "error",
      title: "¡Upss!",
      text: "Recuerda usar el chatbot para obtener ayuda, ¡Intentalo de nuevo! "+ puntos + secondTime,
      button: "OK",
    });
  };

  const [arreglo, setArreglo] = useState ([]);

  const evaluarAplicarClase = () => {
    if (arreglo.length >= 4){
        setArreglo([]);        
    }
    if (arreglo.length === 0){
      arreglo.push(columns[2].items[0].id);
      arreglo.push(columns[2].items[1].id);
      arreglo.push(columns[2].items[2].id);
      arreglo.push(columns[2].items[3].id);
      console.log(arreglo)

      if(arreglo.includes("Primero")){
          if(arreglo.includes("Tercero")){
              if(arreglo.includes("Quinto")){
                  if(arreglo.includes("Sexto")){
                      pause();
                      if (secondTime < 20){
                          setPuntos(10);
                          mensajeCorrecto(10);
                      }
                      if (secondTime >=20 && secondTime < 40){
                          setPuntos(7);
                          mensajeCorrecto(7);
                      }
                      if (secondTime >=40 && secondTime < 60){
                          setPuntos(5);
                          mensajeCorrecto(5);
                      }
                      props.evento();
                    }
                    else{
                        mensajeIncorrecto();
                    }
                }
                else{
                    mensajeIncorrecto();
                }
            }
        else{
            mensajeIncorrecto();
        }
    }
    else{
        mensajeIncorrecto();
    }
  }
}


            

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="container-Bloom-Analizar">

        <div className="PreguntaAnalizarObjeto">

            <div className="bloque-pregunta">

            </div>
            
            <div className="Diagrama">
                <span><img src={preguntaAnalizarObjeto} alt="pregunta" className="DiagramaAnaliarObjeto" /></span>
            </div>
            
        </div>
      
      <button onClick={evaluarAplicarClase} className='evaluar-AplicarClase'>Evaluar</button>
      <div style={{ fontSize: "100px", zIndex:"100" }}>
        <span className='Timer'>{secondTime}</span>
        <p>{isRunning ? "Running" : "Not running"}</p>
      </div>
    <div className='PreguntaAplicarClase'>

      <span className="Prueba"></span>
             
    </div>

    <div style={{ display: "flex", justifyContent: "center", height: "10%", color:"black", position:"absolute", left:"40%", top:"0%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >





        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="BloqueAnalizarObjeto"
              style={{
                display: "block",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          width: 300,
                          minHeight: 350,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 10,
                                      margin: "0 0 8px 0",
                                      minHeight: "10px",
                                      width: "100%",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>



      
    </div>
    <div className="contenedorBarra">
      <h2 className="porcentaje"
        style={{
          color: state === 100 ? "#e84118" : "Black"
        }}
      >
        {state === 100
          ? "Completo"
          : `${state}%`}
      </h2>

      <ProyeccionProgress width={state} />
      <ProgressButton
        progress={state}
        makeProgress={() => {
          state < 100 ? setState(state + 20) : setState(0);
        }}
      />
    </div>
    </div>
    
  );
}





export default AnalizarObjeto;