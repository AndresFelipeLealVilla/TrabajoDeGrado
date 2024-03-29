import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import preguntaAnalizarClase from '../../../img/taxonomia/3Analizar/ClaseVehiculoAnalizarClase.png'
import swal from 'sweetalert'
import './Analizar.css'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import progreso from '../../../img/Progreso/75.jpg'

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
/* Declaraciones */  
    const [temporal, setTemporal] = useState(0)
const db = getFirestore(app)
const Usuario = getAuth().currentUser;
const datosEstudiante = collection(db, "Estudiantes");
const qu = query(datosEstudiante, where("Email", "==", Usuario.email));
const [obtId, setObtId] = useState('')
 


/* ************ Traer datos de la base de datos ************* */
const obtenerEstudiante = async () => {
  const querySnapshot = await getDocs(qu);
  querySnapshot.forEach((documento) => {
    setTemporal(parseInt(documento.data().Puntos));
    setObtId(documento.id)
  },);
};


  /* Actualizar los datos de un estudiante en firestore */
const ActualizarDatos = async () => {
  obtenerEstudiante();
    await updateDoc(doc(db, "Estudiantes", obtId), {
      Puntos: 5 + temporal
    });
 }

 useEffect (() => {
  obtenerEstudiante();
  ActualizarDatos();    
},[]);



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
  
    const evaluarAnalizarClase = () => {
      if (columns[2].items.length === 1 && columns[3].items.length === 1 && columns[4].items.length === 1 && columns[5].items.length === 1 && columns[6].items.length === 1 && columns[7].items.length === 1 ){ 
          if(columns[2].items[0].id === "Primero"){
              if(columns[3].items[0].id === "Segundo"){
                  if(columns[4].items[0].id === "Sexto"){
                      if(columns[5].items[0].id === "Cuarto"){
                          if(columns[6].items[0].id === "Tercero"){
                              if(columns[7].items[0].id === "Quinto"){
                                  mensajeCorrecto(5);
                                  ActualizarDatos();
                                  props.evento();
                              }
                              else{
                                  mensajeIncorrecto();
                                  props.evento();
                              }
                          }
                          else{
                              mensajeIncorrecto();
                              props.evento();
                          }
                      }
                      else{
                          mensajeIncorrecto();
                          props.evento();
                      }
                  }
                  else{
                      mensajeIncorrecto();
                      props.evento();
                  }
              }
              else{
                  mensajeIncorrecto();
                  props.evento();
              }
          }
          else{
              mensajeIncorrecto();
              props.evento();
          }
      }else{
          mensajeIncorrecto();
          props.evento();
      }
  }

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className='container-BloomAnalizarClase'>
        <img src={preguntaAnalizarClase} alt='preguntaAnalizarClase' className='preguntaAnalizarClase'/>
        <button onClick={evaluarAnalizarClase} className='evaluarAnalizarClase'>Evaluar</button>

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
                                      textAlign: "center",
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
      <div className='bloque-preguntaAnalizar'>
            <h1 className='TituloPregunta'>Actividad #3</h1>
            <span className='TextoPregunta'>Diferenciar las partes de las que se compone la clase Vehículo. 
            Para ello usa la opción de arrastrar y soltar.</span>
          
            </div>
     </div>
    </div>
    <img src={progreso} className='Progreso' alt='progreso' />
    </div>
  );
}

export default AnalizarMetodosAtributos;

