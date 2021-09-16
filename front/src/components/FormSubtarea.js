import React, { useContext, useRef, useState } from 'react';
import { Store } from '../context/TodoContext';


const HOST_API = "http://localhost:8080/api";

const FormSubtarea = (props) => {
    const formRef = useRef(null);
    //useContext: obtener el contenido del contexto
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    //Crear nueva tarea
    const onAdd = (event) => {
        event.preventDefault();
        console.log(props.idTarea + "Tarea")

        const request = {
            name: state.name,
            id: null,
            completed: false,
            groupListId: props.idTarea
        };
        console.log(request.groupListId + "request")
        setState(request);

        console.log(request);

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

    return (

        <form ref={formRef}>
            <p>SUBTAREAS -FORM</p>
            <div class="mb-3">
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="¿Qué piensas hacer hoy?"
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}  ></input>
            </div>
            <div class="mb-3">
                {item.id && <button onClick={onEdit} class="btn btn-outline-info">Actualizar</button>}
                {!item.id && <button onClick={onAdd} class="btn btn-outline-success" >Crear Subtarea +</button>}
            </div>
        </form>
    )
}

export default FormSubtarea;