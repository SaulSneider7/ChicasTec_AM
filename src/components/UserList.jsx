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
                        <p>{usuario.nombre} - {usuario.edad} años</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;