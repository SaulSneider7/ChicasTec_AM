import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//Proveedor de Google
const provider = new GoogleAuthProvider();


function Login({ onLogin, cambiarVista}) {

    //Iniciar sesion con email y password
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
    //--------------------------------------------------

    const iniciarSesionGoogle = () => {
        // Documentacion de Firebase
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("Iniciaste sesion con Google");
            onLogin(user);
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error al iniciar con Google");
            console.log(error);
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
            <button onClick={iniciarSesionGoogle}>Iniciar Sesion con Google</button>
            <p>No tienes una cuenta?</p>
            <button onClick={cambiarVista}>Crear cuenta</button>
        </div>
    )
}
export default Login;