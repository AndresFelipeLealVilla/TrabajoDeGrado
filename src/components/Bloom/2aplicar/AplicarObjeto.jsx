import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import swal from 'sweetalert'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'

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
  const [arreglo1, setArreglo] = useState ([]);
  const [arreglo2, setArreglo2] = useState ([]);
  const[temporal, setTemporal] = useState(0);
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

  const evaluarAplicarObjeto = () => {
    if(columns[2].items.length === 5 && columns[3].items.length === 3){
      arreglo1.push(columns[2].items[0].id);
      arreglo1.push(columns[2].items[1].id);
      arreglo1.push(columns[2].items[2].id);
      arreglo1.push(columns[2].items[3].id);
      arreglo1.push(columns[2].items[4].id);

      arreglo2.push(columns[3].items[0].id);
      arreglo2.push(columns[3].items[1].id);
      arreglo2.push(columns[3].items[2].id);

      if(arreglo1.includes("Segundo")){
          if(arreglo1.includes("Tercero")){
              if(arreglo1.includes("Cuarto")){
                  if(arreglo1.includes("Septimo")){
                      if(arreglo1.includes("Octavo")){
                          if(arreglo2.includes("Primero")){
                              if(arreglo2.includes("Quinto")){
                                if(arreglo2.includes("Sexto")){
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
           

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="containerAplicarObjeto">
      <button onClick={evaluarAplicarObjeto} className='evaluarAplicarObjeto'>Evaluar</button>

    <div className='PreguntaAplicarObjeto'>
    <div className='bloque-pregunta'>
            <h1 className='TituloPregunta'>Actividad #2</h1>
            <span className='TextoPregunta'>Determine las diferencias entre las clases y los objetos, 
            ubique cada una de las opciones disponibles en la columna correspondiente.</span>
          
            </div>
             
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
    </div>
    
  );
}





export default AplicarObjeto;