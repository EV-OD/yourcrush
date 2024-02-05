import React from "react";
import firebase from "firebase/compat/app";
import useApp from "../hooks/useApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import topleft from "../assets/topleft.png";
import topright from "../assets/topright.png";
import bottomleft from "../assets/bottomleft.png";
import bottomright from "../assets/bottomright.png";
import heart from "../assets/heart.png";
import hero from "../assets/hero.png";
import Google from "../assets/google.svg";
import couple from "../assets/couple.png";
import flyinghearts from "../assets/flyinghearts.png";

function Login() {
  const { auth } = useApp();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        let email = result.user.email;
        if (email && !email.includes("pcampus.edu.np")) {
          alert("Please use your pcampus email to login");
          auth.signOut();
          return false;
        }
        console.log("Successfully signed in with Google");
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div className="login w-full h-full flex justify-center items-center relative">
      <div className="decoration absolute inset-0 overflow-hidden">
        <img
          src={topleft}
          alt="love"
          className="absolute object-cover top-0 left-0 w-56"
        />
        <img
          src={topright}
          alt="love"
          className=" absolute object-cover top-0 right-0 w-56 md:block hidden"
        />
        <img
          src={topright}
          alt="love"
          className="absolute object-cover bottom-0 left-0 w-56 scale-[-1] md:block hidden"
        />
        <img
          src={bottomright}
          alt="love"
          className="absolute object-cover bottom-0 right-0 w-56 md:block hidden"
        />
        <div className="couple absolute -bottom-10 right-0 md:hidden block z-0">
          <img
            src={couple}
            alt="hero"
            className="relative md:hidden block w-[300px] z-20"
          />
          <img
            src={heart}
            alt="love"
            className="md:hidden block absolute h-[700px] scale-150 object-contain -bottom-20 z-10"
          />
        </div>
        <img
          src={flyinghearts}
          alt="love"
          className="md:hidden block w-[100px] absolute bottom-1/2 translate-y-24 left-10 z-10"
        />
      </div>
      <div className="heroSection flex w-full -translate-y-20 z-20 md:flex-row flex-col">
        <div className="left flex flex-col md:text-center md:w-1/2 w-full justify-center md:-translate-y-0 -translate-y-20 ">
          <h1 className="hero-text xl:text-8xl lg:text-7xl text-6xl text-center md:-translate-y-0 -translate-y-10 text-red-600 md:mx-0 mx-auto">
            Valentine's Day
            <br />
            Special
          </h1>
          <p className="xl:text-3xl lg:text-2xl text-xl text-black font-light md:my-5  md:mx-0 mx-auto">
            <p>I never believed in luck until I met you </p>
          </p>
          <button
            className="bg-primary hover:bg-dark w-max mx-auto mt-5 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-5"
            onClick={signInWithGoogle}
          >
            <span>
              <img src={Google} alt="google" className="w-4 h-4" />
            </span>
            <span>Sign in with Google</span>
          </button>
        </div>
        <div className="right md:w-1/2 w-full z-20 flex justify-center -ml-10 md:relative">
          <img
            src={heart}
            alt="love"
            className="md:block hidden left-0 top-0 absolute object-cover w-[700px] -translate-y-16 translate-x-10"
          />
          <div className="relative md:block hidden">
            <img
              src={hero}
              alt="hero"
              className="xl:w-[500px] md:w-[350px] w-[200px] z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
