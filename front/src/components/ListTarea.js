import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../context/TodoContext';
import FormSubtarea from './FormSubtarea';
import ListSubTarea from './ListSubTarea';

const HOST_API = "http://localhost:8080/api";
const ListTarea = () => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;
    console.log(currentList);

    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked
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
            });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return <div>

        {/* Filter de las tareas que no tienen id relacionado (Tareas)*/}
        {currentList.map((todo) => {
            return (
                <>

                    <p>{todo.id}</p>
                    <p>{todo.name}---- Tarea principal----</p> 
                    <FormSubtarea idTarea={todo.id} />
                    <p>Lista subTareas</p>
                    <ListSubTarea idTarea={todo.id}/>
                    <p>Lista subTareas</p>



                </>
            )
        })}

        {/* Traer subTareas relacionadas*/}



    </div>
}

export default ListTarea;