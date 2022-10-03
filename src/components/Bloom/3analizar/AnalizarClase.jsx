import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Analizar.css'
import preguntaAnalizarClase from '../../../img/taxonomia/3Analizar/ClaseVehiculoAnalizarClase.png'
import { useStopwatch } from "react-timer-hook";
import swal from 'sweetalert'

const itemsFromBackend = [
  { id: "Primero", content: "Nombre" },
  { id: "Segundo", content: "Atributos" },
  { id: "Tercero", content: "Métodos" },
  { id: "Cuarto", content: "Zona privada" },
  { id: "Quinto", content: "Zona pública" },
  { id: "Sexto", content: "Constructor" }
];

const columnsFromBackend = {
  1: {
    name: "",
    items: itemsFromBackend
  },
  2: {
    name: "",
    items: []
  },
  3: {
    name: "",
    items: []
  },
  4: {
    name: "",
    items: []
  },
  5: {
    name: "",
    items: []
  },
  6: {
    name: "",
    items: []
  },
  7: {
    name: "",
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

function AnalizarMetodosAtributos(props) {



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
  
    const evaluarAnalizarClase = () => {
      if(columns[2].items[0].id === "Primero"){
        if(columns[3].items[0].id === "Segundo"){
          if(columns[4].items[0].id === "Sexto"){
            if(columns[5].items[0].id === "Cuarto"){
              if(columns[6].items[0].id === "Tercero"){
                if(columns[7].items[0].id === "Quinto"){
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
        else{
          mensajeIncorrecto();
        }
      }
      else{
        mensajeIncorrecto();
      }
    }

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className='container-BloomAnalizarClase'>
        <img src={preguntaAnalizarClase} alt='preguntaAnalizarClase' className='preguntaAnalizarClase'/>
        <button onClick={evaluarAnalizarClase} className='evaluar-AplicarClase'>Evaluar</button>
      <div style={{ fontSize: "100px", zIndex:"100" }}>
        <span className='Timer'>{secondTime}</span>
        <p>{isRunning ? "Running" : "Not running"}</p>
      </div>
    <div className="Container-draganddrop">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="bloqueAnalizarClase" key={columnId}>
              <h2>{column.name}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div  className="container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: -10,
                          width: 150,
                          height: 30,
                          top: -70,
                          position: "relative",
                          margin:"0",
                          

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
                                      padding: 8,
                                      margin: "0 0 8px 0",
                                      minHeight: "15px",
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
      <div className="orientacionAnalizarClase">
      <h2>Analizar:</h2>
      <p>pregunta</p>
     </div>
    </div>
    
    </div>
  );
}

export default AnalizarMetodosAtributos;

