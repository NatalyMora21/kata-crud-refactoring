import React, { useContext, useRef, useState } from 'react';
import { Store } from '../context/TodoContext';


const HOST_API = "http://localhost:8080/api";

const FormTarea = () => {
    const formRef = useRef(null);
    //useContext: obtener el contenido del contexto
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const [showform, setShowform] = useState(false);


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
            <div className="mb-3">
                <button onClick={() => { setShowform(!showform) }} className="btn btn-primary">Agegar Tarea {showform ? <i class="fas fa-minus icon-more"></i> : <i class="fas fa-plus icon-more"></i>}</button>
            </div>
            < div className="content-form">



                {showform &&
                    <form ref={formRef}>
                        <div className="mb-2">
                            <input class="form-control"
                                type="text"
                                name="name"
                                placeholder="Nueva lista de To-DO"
                                defaultValue={item.name}
                                onChange={(event) => {
                                    setState({ ...state, name: event.target.value })
                                }}  ></input>
                        </div>

                        <button onClick={onAdd} className="btn btn-primary save">Guardar </button>
                    </form>
                }

            </ div>
        </>
    )
}

export default FormTarea;