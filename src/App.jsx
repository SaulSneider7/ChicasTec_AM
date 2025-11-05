import { useState } from 'react'
import './App.css'
//importamos firebase
import app from './firebase'
//Autentication
import { getAuth, signOut } from 'firebase/auth';

import AddUser from './components/AddUser';
import UserList from './components/UserList';
import Login from './components/Login';
import RegistrarUsuario from './components/RegistrarUsuario';

function App() {
  console.log(app);

  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(true);

  // Funcion para cerrar sesion
  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUsuario(null);
  } 

  const cambiarVista = () => {
    setMostrarLogin(!mostrarLogin);
  }
  
  return (
    <>
      {!usuario ? (
        mostrarLogin ? (
          <Login 
            onLogin={setUsuario}  
            cambiarVista={cambiarVista}
          />
        ) : (
          <RegistrarUsuario 
            onRegister={setUsuario} 
            cambiarVista={cambiarVista} 
          />
        )
      ) : (
        <>
          <div>
            <h1 className='text-center'>Mi pagina web con React y Firebase</h1>
          </div>

          <AddUser />
          <hr />
          <UserList />
          <button onClick={cerrarSesion}>Cerrar sesion</button>
        </>
      ) }


      
    </>
  )
}

export default App
