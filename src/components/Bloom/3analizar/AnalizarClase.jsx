import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Analizar.css'
import preguntaAnalizarClase from '../../../img/taxonomia/3Analizar/PreguntaAnalizarClase.png'

const itemsFromBackend = [
  { id: "primero", content: "Nombre" },
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

function AnalizarMetodosAtributos() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className='container-BloomAnalizarClase'>
        <img src={preguntaAnalizarClase} alt='preguntaAnalizarClase' className='preguntaAnalizarClase'/>
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

