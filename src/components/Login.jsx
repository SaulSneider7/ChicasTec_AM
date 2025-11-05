import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLogin, cambiarVista}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = async() => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Se inicio sesion");
            onLogin(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error al iniciar sesion");
        });
    }

    return(
        <div>
            <h1>Iniciar Sesion</h1>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={iniciarSesion}>Iniciar Sesion</button>
            <p>No tienes una cuenta?</p>
            <button onClick={cambiarVista}>Crear cuenta</button>
        </div>
    )
}
export default Login;