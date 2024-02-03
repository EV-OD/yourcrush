import React from "react";
import firebase from "firebase/compat/app";
import useApp from "../assets/hooks/useApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const { auth } = useApp();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        console.log("Successfully signed in with Google");
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div className="flex flex-col">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
      <p className=" text-center">Use College Gmail</p>
    </div>
  );
}

export default Login;
