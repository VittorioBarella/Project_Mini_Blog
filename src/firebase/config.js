import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoeZPkt6ZwkbXavg6n8Ei2JhYO-1mJB6g",
    authDomain: "miniblog-e9a24.firebaseapp.com",
    projectId: "miniblog-e9a24",
    storageBucket: "miniblog-e9a24.appspot.com",
    messagingSenderId: "134575735995",
    appId: "1:134575735995:web:e27810eed4528b9f54159e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

