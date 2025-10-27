import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 
function AddUser() {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");

    const AgregarUsuarios = async () => {
        try {
            const docRef = await addDoc(collection(db, "usuarios"), {
            nombre: nombre,
            edad: edad,
            fechaRegistro: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return(
        <div>
            <h1>Formulario</h1>
            <label htmlFor="">Nombre:</label>
            <input 
                type="text" 
                placeholder="Escribe tu nombre" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="">Edad:</label>
            <input 
                type="text" 
                placeholder="Edad" 
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
            />
            <button onClick={AgregarUsuarios}>Agregar usuario</button>
        </div>
    )
}

export default AddUser;