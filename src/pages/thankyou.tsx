import useApp from "../hooks/useApp";
import topleft from "../assets/topleft.png";
import topright from "../assets/topright.png";
import bottomright from "../assets/bottomright.png";
import arrowman from "../assets/arrowman.png";
import { useState } from "react";
import couple2 from "../assets/couple2.png";
import flyinghearts from "../assets/flyinghearts.png";
import couple from "../assets/couple.png";
import { Link } from "react-router-dom";

function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useApp();

  return (
    <div className="login w-full h-full flex justify-center items-center relative">
      <div className="decoration absolute inset-0 overflow-hidden">
        <img
          src={arrowman}
          alt="love"
          className="absolute md:bottom-0 -bottom-10 md:-right-9 -right-20 2xl:w-[550px] xl:w-[500px] md:w-[450px] w-[300px] md:-rotate-45 rotate-[30] z-10"
        />
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
          className="absolute object-cover bottom-0 right-0 w-56 md:block hidden z-20"
        />
        <img
          src={couple2}
          alt="love"
          className="absolute md:top-1/2 top-[80%] translate-y-[-50%] md:left-10 left-0 w-[200px] lg:block"
        />
      </div>
      <div className="heroSection flex w-full z-20 flex-col md:justify-center h-full items-center md:-translate-y-0 -translate-y-10">
        <div className="left flex flex-col md:text-center w-full justify-center md:-translate-y-0 md:mt-0 mt-16">
          <h1 className="hero-text xl:text-9xl lg:text-8xl md:text-6xl text-5xl md:-mt-44 mt-20 mb-3 text-center md:-translate-y-0 text-red-600 md:mx-0 mx-auto">
            Valentine's Day Special
          </h1>
        </div>
        <div className=" right w-full flex flex-col realtive justify-center items-center z-20 md:mt-0 mt-10 md:px-0 px-10">
          <div className="flex gap-4 flex-col items-center">
            <div className="top flex gap-5 flex-col">
              <div className="head text-center md:text-6xl text-4xl text-red-500 font-newSun">
                Thank You !!
              </div>
              <div className="container flex md:flex-row flex-col justify-between items-center text-red-500 max-w-[700px] w-full px-4 gap-10 text-center text-xl">
                <div className="left">
                  Link to see Result{" "}
                  <span className="text-sm">(Updated every day at 6 PM)</span>
                  <br />
                  <Link to="/match" className="text-blue-500 underline">
                    Result
                  </Link>
                </div>
                <div className="right">Please Share it with your friends</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
