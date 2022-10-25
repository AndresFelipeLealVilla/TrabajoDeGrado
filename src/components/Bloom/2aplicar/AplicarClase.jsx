import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import swal from 'sweetalert'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import {app} from '../../../Firebase'
import './Aplicar.css'
import progreso from '../../../img/Progreso/50.jpg'



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
  const [arreglo, setArreglo] = useState ([]);
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

/* Ejercicio */
  const evaluarAplicarClase = () => {
    if(columns[2].items.length === 4){
      arreglo.push(columns[2].items[0].id);
      arreglo.push(columns[2].items[1].id);
      arreglo.push(columns[2].items[2].id);
      arreglo.push(columns[2].items[3].id);

      if(arreglo.includes("Primero")){
          if(arreglo.includes("Tercero")){
              if(arreglo.includes("Quinto")){
                  if(arreglo.includes("Sexto")){
                      ActualizarDatos();
                      mensajeCorrecto(5);
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
    }else{
      mensajeIncorrecto();
      props.evento();
    }
  }


            
/* Contenido */
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="containerAplicarClase">
        <button onClick={evaluarAplicarClase} className='evaluarAplicarClase'>Evaluar</button>
      
    <div className='PreguntaAplicarClase'>
    <div className='bloque-preguntaComprenderMetodo'>
            <h1 className='TituloPregunta'>Actividad #2</h1>
            <span className='TextoPregunta'>Determine las características que tienen las clases, seleccione las opciones correctas.</span>
            <span className='Observacion'>Recuerde usar el drag and drop (arrastrar y solar) para llevar los 
            recuadros elegidos de la columna "Opciones" a la columna "Características de clase".</span>
            </div>
        
    </div>

    <div style={{ display: "flex", justifyContent: "center", height: "10%", color:"black", position:"absolute", left:"38%", top:"0%"}}>
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
                          ? "lightblue"
                          : "lightgrey",
                          width: 250,
                          minHeight: 410,
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
                                      minHeight: "50px",
                                      textAlign: "center",
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
    <img src={progreso} className='Progreso' alt='progreso' />
  </div>
    
  );
}

export default AplicarClase;