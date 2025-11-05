import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegistrarUsuario({onRegister, cambiarVista}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Funcion para registrar
    const registrar = async() =>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Cuenta creada con exito");
            onRegister(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error al registrar el usuario");
            console.log(errorCode);
            console.log(errorMessage);            
        });
    }

    return(
        <div>
            <h1>Registrar Usuario</h1>
            <input 
                type="email"
                placeholder="Escribe tu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={registrar}>Registrar</button>
            <button onClick={cambiarVista}>Iniciar sesion</button>
        </div>
    )
}

export default RegistrarUsuario