import React, { useContext, useRef, useState } from 'react';
import { Store } from '../context/TodoContext';


const HOST_API = "http://localhost:8080/api";

const FormTarea = () => {
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

    return (
        <>
            <form ref={formRef}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nueva lista de To-DO"
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}  ></input>

                {<button onClick={onAdd}>Nueva Tarea</button>}
            </form>
        </>
    )
}

export default FormTarea;