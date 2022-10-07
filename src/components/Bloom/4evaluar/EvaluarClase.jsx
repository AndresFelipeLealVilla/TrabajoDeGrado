import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Evaluar.css'
import imagen1 from '../../../img/taxonomia/4Evaluar/Evaluar1.png'
import ProyeccionProgress from "../../progressBar/ProyeccionProgress";
import ProgressButton from "../../progressBar/ProgressButton";

const itemsFromBackend = [
  { id: "primero", content: <img src={imagen1} alt='preguntaEvaluarClase' className='preguntaEvaluarClase'/> },
  { id: "Segundo", content: "Second task" },
  { id: "Tercero", content: "Third task" },
  { id: "Cuarto", content: "Fourth task" },
  { id: "Quinto", content: "Fifth task" }
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

function EvaluarClase() {

  const [state, setState] = useState(60);

  const [columns, setColumns] = useState(columnsFromBackend);
  return (

    <div className="Container-draganddropEvaluarClase">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="bloqueEvaluarClase" key={columnId}>
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
                          padding: 0,
                          width: 300,
                          height: 200,
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
                                      minHeight: "85px",
                                      width: "100px",
                                      left: 0,
                                      position: "absolute",
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
      <div className="orientacion">
      <h2>Evaluar:</h2>
      <p>prueba de texto</p>
     </div>
     <button className="btn-Bloom">Analizar</button>


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

export default EvaluarClase;
