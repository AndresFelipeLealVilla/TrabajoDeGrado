import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import swal from 'sweetalert'
import ProgressButton from "../../progressBar/ProgressButton";
import ProyeccionProgress from "../../progressBar/ProyeccionProgress";

import './Aplicar.css'


/* Creación drag and drop */

const itemsFromBackend = [
  { id: "Primero", content: "Plantilla para crear objetos" },
  { id: "Segundo", content: "Instancia de clase" },
  { id: "Tercero", content: "Estructura de programación" },
  { id: "Cuarto", content: "Acción que realiza un objeto" },
  { id: "Quinto", content: "Creación de datos comunes a todos los objetos" },
  { id: "Sexto", content: "Contiene al constructor" }

];

const columnsFromBackend = {
  1: {
    name: "Opciones",
    items: itemsFromBackend
  },
  2: {
    name: "Caracteristicas de las Clase",
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

function AplicarClase(props) {
/* Declaraciones */
  const [puntos, setPuntos] = useState(0);
  const [arreglo, setArreglo] = useState ([]);
  const [dato, setDato] = useState(40);
  const [state, setState] = useState(20);


/* Mensaje Correcto */
  const mensajeCorrecto = (points) => {
    swal({
      icon: "success",
      title: "¡Gran Trabajo!",
      text: "Obtuviste: " + points + " puntos ¡¡¡FELICITACIONES!!!",
      button: "OK",
  });

};

/* Mensaje Incorrecto */
  const mensajeIncorrecto = () => {
    swal({
      icon: "error",
      title: "¡Upss!",
      text: "Recuerda usar el chatbot para obtener ayuda",
      button: "OK",
    });
  };

/* Ejercicio */
  const evaluarAplicarClase = () => {
    if (arreglo.length !== 4){
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
                      setPuntos(5);
                      mensajeCorrecto(5);
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
    props.evento();
  }


            
/* Contenido */
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="containerAplicarClase">
        <button onClick={evaluarAplicarClase} className='evaluarAplicarClase'>Evaluar</button>
      
    <div className='PreguntaAplicarClase'>
        
    </div>

    <div style={{ display: "flex", justifyContent: "center", height: "10%", color:"black", position:"absolute", left:"40%", top:"0%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}>
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
                            ? "white"
                            : "white",
                          width: 150,
                          minHeight: 350,
                          borderColor: "black",
                          borderWidth: "20px",
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
                                        ? "red"
                                        : "#f44336",
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

export default AplicarClase;