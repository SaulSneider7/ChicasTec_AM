import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

function UserList() {
    const [usuarios, setUsuarios] = useState([]);

    // constantes para editar
    const [editandoID, setEditandoID] = useState(null);
    const [nombreEditado, setNombreEditado] = useState("");
    const [edadEditada, setEdadEditada] = useState("");

    // Funcion para editar
    const editarUsuario = async (id) => {
        const usuarioRef = doc(db, "usuarios", id);
        await updateDoc(usuarioRef, {
            nombre: nombreEditado,
            edad: edadEditada
        });
        setEditandoID(null);
    }



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
                                <button onClick={() =>{
                                    setEditandoID(usuario.id);
                                    setNombreEditado(usuario.nombre);
                                    setEdadEditada(usuario.edad);
                                } }>Editar</button>
                            </>
                        )}
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;