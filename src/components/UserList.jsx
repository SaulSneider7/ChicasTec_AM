import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function UserList() {
    const [usuarios, setUsuarios] = useState([]);

    //=========================
    // constantes para editar
    //=========================
    const [editandoID, setEditandoID] = useState(null);
    const [nombreEditado, setNombreEditado] = useState("");
    const [edadEditada, setEdadEditada] = useState("");

    // ===================================================
    // Funcion para editar
    // ===================================================
    const editarUsuario = async (id) => {
        const usuarioRef = doc(db, "usuarios", id);
        await updateDoc(usuarioRef, {
            nombre: nombreEditado,
            edad: edadEditada
        });
        setEditandoID(null);
    }



    // ===================================================
    // Funcion para obtener los usuarios
    // ===================================================
    useEffect(() => {
        const ObtenerUsuarios = onSnapshot(collection(db, "usuarios"), (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsuarios(lista)
        })

        return () => ObtenerUsuarios();
    }, []);

    // ===================================================
    // Funcion para Eliminar los usuarios
    // ===================================================
    const eliminarUsuario = async (id) => {
        const confirmar = window.confirm("confirmas?");
        if(confirmar){
            await deleteDoc(doc(db, "usuarios", id));
            alert("eliminado con exito");
        } else{
            alert("error al eliminar");
        }
    }


    // ===================================================
    // Mostrar los usuarios
    // ===================================================
    return(
        <div>
            <h2>Lista de Usuarios en Firebase</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {editandoID == usuario.id ? (
                            <>
                                <input 
                                    type="text" 
                                    value={nombreEditado}
                                    onChange={(e)=>setNombreEditado(e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    value={edadEditada}
                                    onChange={(e)=>setEdadEditada(e.target.value)}
                                />
                                <button onClick={() => editarUsuario(usuario.id)}>Guardar</button>
                                <button onClick={() => setEditandoID(null)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <p>{usuario.nombre} - {usuario.edad} años</p>
                                //boton para editar
                                <button onClick={() =>{
                                    setEditandoID(usuario.id);
                                    setNombreEditado(usuario.nombre);
                                    setEdadEditada(usuario.edad);
                                } }>Editar</button>

                                //boton para eliminar
                                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </>
                        )}
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;