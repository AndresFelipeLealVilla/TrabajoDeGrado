import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Aplicar.css'
import { useStopwatch } from "react-timer-hook";
import swal from 'sweetalert'


/* Creación drag and drop */

const itemsFromBackend = [
  { id: "Primero", content: "Instancia de clase" },
  { id: "Segundo", content: "Plantilla para crear objetos" },
  { id: "Tercero", content: "Estructura de programación" },
  { id: "Cuarto", content: "Creación de datos comunes a todos los objetos" },
  { id: "Quinto", content: "Tipo de dato" },
  { id: "Sexto", content: "Se usa la palabra 'new'" },
  { id: "Septimo", content: "Se usa la palabra 'class'" },
  { id: "Octavo", content: "Contiene al constructor" },

];

const columnsFromBackend = {
  1: {
    name: "Opciones",
    items: itemsFromBackend
  },
  2: {
    name: "Clase",
    items: []
  },
  3:{
    name: "Objetos",
    items: []
  }

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

function AplicarObjeto(props) {


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

  const [arreglo1, setArreglo] = useState ([]);
  const [arreglo2, setArreglo2] = useState ([]);

  const evaluarAplicarObjeto = () => {
    if (arreglo1.length >= 5){
        setArreglo([]);        
    }
    if (arreglo2.length >= 4){
        setArreglo2([]);
    }
    if ((arreglo1.length === 0) && (arreglo2.length === 0)){
      arreglo1.push(columns[2].items[0].id);
      arreglo1.push(columns[2].items[1].id);
      arreglo1.push(columns[2].items[2].id);
      arreglo1.push(columns[2].items[3].id);
      arreglo1.push(columns[2].items[4].id);

      console.log(arreglo1);
      arreglo2.push(columns[3].items[0].id);
      arreglo2.push(columns[3].items[1].id);
      arreglo2.push(columns[3].items[2].id);
      console.log(arreglo2)

      if(arreglo1.includes("Segundo")){
          if(arreglo1.includes("Tercero")){
              if(arreglo1.includes("Cuarto")){
                  if(arreglo1.includes("Septimo")){
                      if(arreglo1.includes("Octavo")){
                          if(arreglo2.includes("Primero")){
                              if(arreglo2.includes("Quinto")){
                                if(arreglo2.includes("Sexto")){
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
    <div className="containerAplicarObjeto">
      <button onClick={evaluarAplicarObjeto} className='evaluar-AplicarObjeto'>Evaluar</button>
      <div style={{ fontSize: "100px", zIndex:"100" }}>
        <span className='Timer'>{secondTime}</span>
        <p>{isRunning ? "Running" : "Not running"}</p>
      </div>
    <div className='PreguntaAplicarObjeto'>

      <span className="Prueba"></span>
             
    </div>

    <div style={{ display: "flex", justifyContent: "center", height: "10%", color:"black", position:"absolute", left:"40%", top:"0%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >





        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
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
                          width: 150,
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
                                      padding: 6,
                                      margin: "0 0 8px 0",
                                      minHeight: "5px",
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

    </div>
    
  );
}





export default AplicarObjeto;