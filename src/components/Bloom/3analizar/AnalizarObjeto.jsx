import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Analizar.css'
import swal from 'sweetalert'
import preguntaObjeto from '../../../img/taxonomia/3Analizar/AnalizarObjeto.PNG'
import preguntaObjeto2 from '../../../img/taxonomia/4Evaluar/AnalizarObjeto.PNG'
import img1 from '../../../img/taxonomia/3Analizar/opcion1.png'
import img2 from '../../../img/taxonomia/3Analizar/opcion2.png'
import img3 from '../../../img/taxonomia/3Analizar/opcion3.png'
import img4 from '../../../img/taxonomia/3Analizar/opcion4.png'
import img5 from '../../../img/taxonomia/3Analizar/opcion5.png'
import img6 from '../../../img/taxonomia/3Analizar/opcion6.png'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {app} from '../../../Firebase'
import { getAuth } from 'firebase/auth'


/* Creación drag and drop */

const itemsFromBackend = [
  { id: "Primero", content: <img src={img1} alt="img1"  className="img1"/> },
  { id: "Segundo", content: <img src={img2} alt="img1"  className="img2"/> },
  { id: "Tercero", content: <img src={img3} alt="img1"  className="img3"/> },
  { id: "Cuarto", content: <img src={img4} alt="img1"  className="img4"/> },
  { id: "Quinto", content: <img src={img5} alt="img1"  className="img5"/> },
  { id: "Sexto", content: <img src={img6} alt="img1"  className="img6"/> }

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


  const [arreglo, setArreglo] = useState ([]);

  const evaluarAnalizarObjeto = () => {
    if(columns[2].items.length === 4){
      arreglo.push(columns[2].items[0].id);
      arreglo.push(columns[2].items[1].id);
      arreglo.push(columns[2].items[2].id);
      arreglo.push(columns[2].items[3].id);
      console.log(arreglo);

      if(arreglo.includes("Primero")){
        if(arreglo.includes("Tercero")){
            if(arreglo.includes("Quinto")){
              if(arreglo.includes("Sexto")){
                ActualizarDatos();
                mensajeCorrecto(5);
                props.evento();
            }else{
                mensajeIncorrecto();
                props.evento();
            }
        }else{
            mensajeIncorrecto();
            props.evento();
        }
      }else{
        mensajeIncorrecto();
        props.evento();
      }
    }else{
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
    <div className="container-Boom-Analizar">

        <div className="PreguntaAnalizarObjeto">

           
            
            <div className="Diagrama">
              <span><img src={preguntaObjeto} alt="pregunta" className="DiagramaObjeto" /></span>
                <span><img src={preguntaObjeto2} alt="pregunta" className="DiagramaObjeto2" /></span>
            </div>
            
        </div>
      
      <button onClick={evaluarAnalizarObjeto} className='evaluarAnalizarObjeto'>Evaluar</button>
    <div className='PreguntaAplicarClase'>
    <div className="bloque-pregunta">
            <h1 className='TituloPregunta'>Actividad #3</h1>
            <span className='TextoPregunta'>Agrupe los objetos que sean instancia de la clase Persona que se 
            presenta a continuación, recuerde arrastrar y soltar en la columna de "Objetos Aceptados".</span>
            </div> 
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
              <div style={{ margin: 2 }}>
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
                          minHeight: 120,
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
                                  <div className="bloquesito"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 5,
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
    
    </div>
    
  );
}





export default AnalizarObjeto;