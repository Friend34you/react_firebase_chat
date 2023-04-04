import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// import firebase from "firebase/compat/app";
// import firebase from "firebase/compat";
// import "firebase/auth"
// import "firebase/firestore"


// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyBUDNnCDRgWJ3cFFuN7zb5DpiY_8b-bdgI",
    authDomain: "chat-react-studying.firebaseapp.com",
    projectId: "chat-react-studying",
    storageBucket: "chat-react-studying.appspot.com",
    messagingSenderId: "343300524072",
    appId: "1:343300524072:web:823f3417a01ec18c570d1d",
    measurementId: "G-T6TF34G3HS"
});

export const Context = createContext(null)

const auth = getAuth();
const firestore = getFirestore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            auth,
            firestore
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

