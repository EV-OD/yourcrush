import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Intro from "./pages/intro";
import React from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRKOt5EqeV3-1fga22IIrf6mGsromIdqE",
  authDomain: "yourcrush-90fa9.firebaseapp.com",
  projectId: "yourcrush-90fa9",
  storageBucket: "yourcrush-90fa9.appspot.com",
  messagingSenderId: "483093675844",
  appId: "1:483093675844:web:37dfd63c6e6a3c39862111",
  measurementId: "G-L6NPB2EC41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const AppProvider = React.createContext(app);

function App() {
  return (
    <>
      <AppProvider.Provider value={app}>
        <Intro />
      </AppProvider.Provider>
    </>
  );
}

export default App;
