import { useState } from 'react'
import './App.css'
//importamos firebase
import app from './firebase'

import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {
  console.log(app);
  
  return (
    <>
      <div>
        <h1>Mi pagina web con React y Firebase</h1>
      </div>

      <AddUser />
      <hr />
      <UserList />
    </>
  )
}

export default App
