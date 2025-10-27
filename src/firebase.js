//Iniciar Firebase
import { initializeApp } from "firebase/app";

//base de datos
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjxOwMXDxXBfJpj22-nphmQDnUIV1ajP0",
  authDomain: "unidad4-d8009.firebaseapp.com",
  projectId: "unidad4-d8009",
  storageBucket: "unidad4-d8009.firebasestorage.app",
  messagingSenderId: "414975276297",
  appId: "1:414975276297:web:da665978542ff7f7b9cfd8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//exportaciones
export default app;
export { db };