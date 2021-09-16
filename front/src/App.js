import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import {Store, StoreProvider} from './context/TodoContext'
import Form from './components/Form'
import List from './components/List'

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
