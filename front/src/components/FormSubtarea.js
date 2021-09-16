import React, {useContext,useRef, useState} from 'react';
import {Store} from '../context/TodoContext';


const HOST_API = "http://localhost:8080/api";

const FormSubtarea = ({idtarea}) => {
  const formRef = useRef(null);
  //useContext: obtener el contenido del contexto
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  //Crear nueva tarea
  const onAdd = (event) => {
      event.preventDefault();

      const request = {
          name: state.name,
          id: null,
          completed: false,
          group_list_id: idtarea
      };


      fetch(HOST_API + "/todo", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
      })
          .then(response => response.json())
          .then((todo) => {
              dispatch({ type: "add-item", item: todo });
              setState({ name: "" });
              formRef.current.reset();
          });
  }

  const onEdit = (event) => {
      event.preventDefault();

      const request = {
          name: state.name,
          id: item.id,
          isCompleted: item.isCompleted
      };


      fetch(HOST_API + "/todo", {
          method: "PUT",
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
      })
          .then(response => response.json())
          .then((todo) => {
              dispatch({ type: "update-item", item: todo });
              setState({ name: "" });
              formRef.current.reset();
          });
  }

  return ( <form ref={formRef}>
      <p>SUBTAREAS -FORM</p>
      <input
          type="text"
          name="name"
          placeholder="¿Qué piensas hacer hoy?"
          defaultValue={item.name}
          onChange={(event) => {
              setState({ ...state, name: event.target.value })
          }}  ></input>
      {item.id && <button onClick={onEdit}>Actualizar</button>}
      {!item.id && <button onClick={onAdd}>Crear Subtarea</button>}
  </form>)
}

export default FormSubtarea;