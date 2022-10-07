import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import swal from 'sweetalert'
import ProgressButton from '../../progressBar/ProgressButton'
import ProyeccionProgress from '../../progressBar/ProyeccionProgress'

import './Aplicar.css'

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
/* Declaraciones */
  const [puntos, setPuntos] = useState(0);
  const [arreglo1, setArreglo] = useState ([]);
  const [arreglo2, setArreglo2] = useState ([]);
  const [state, setState] = useState(20)

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
      props.evento();              
    }
  }


            

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="containerAplicarObjeto">
      <button onClick={evaluarAplicarObjeto} className='evaluarAplicarObjeto'>Evaluar</button>

    <div className='PreguntaAplicarObjeto'>
             
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





export default AplicarObjeto;