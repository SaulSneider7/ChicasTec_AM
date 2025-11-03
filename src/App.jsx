import { useState } from 'react'
import './App.css'
//importamos firebase
import app from './firebase'

import AddUser from './components/AddUser';
import UserList from './components/UserList';
import Login from './components/Login';
import RegistrarUsuario from './components/RegistrarUsuario';

function App() {
  console.log(app);
  
  return (
    <>
      <div>
        <h1 className='text-center'>Mi pagina web con React y Firebase</h1>
      </div>

      <Login />
      <hr />
      <RegistrarUsuario />

      <AddUser />
      <hr />
      <UserList />
    </>
  )
}

export default App
