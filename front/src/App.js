import React from 'react';
import {StoreProvider} from './context/TodoContext'
import FormTarea from './components/FormTarea'
import ListTarea from './components/ListTarea'
import FormSubtarea from './components/FormSubtarea';

import img from './perfil.png'


function App() {
  return <StoreProvider>
    <div className="continer"> 
      <img className="fotoperfil" src={img} />
      <h1>Mis tareas</h1>
      <div className="gestion">
        <h3 className="mb-3">Gestione sus tareas</h3>
        <FormTarea />
        {/* Lista solo las tareas Tareas */}
        <ListTarea />
      </div>
    </div>
   
  </StoreProvider>

}

export default App;
