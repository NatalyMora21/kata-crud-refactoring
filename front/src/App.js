import React from 'react';
import {StoreProvider} from './context/TodoContext'
import FormTarea from './components/FormTarea'
import ListTarea from './components/ListTarea'
import FormSubtarea from './components/FormSubtarea';


function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <FormTarea />
    {/* Lista solo las tareas Tareas */}
    <ListTarea />
   
  </StoreProvider>

}

export default App;
