import useApp from "../hooks/useApp";
import topleft from "../assets/topleft.png";
import topright from "../assets/topright.png";
import bottomright from "../assets/bottomright.png";
import arrowman from "../assets/arrowman.png";
import { useState } from "react";
import couple2 from "../assets/couple2.png";
import flyinghearts from "../assets/flyinghearts.png";

function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useApp();

  return (
    <div className="login w-full h-full flex justify-center items-center relative">
      <div className="decoration absolute inset-0 overflow-hidden">
        <img
          src={arrowman}
          alt="love"
          className="absolute md:bottom-0 -bottom-20 md:-right-24 -right-24 2xl:w-[550px] xl:w-[500px] md:w-[450px] w-[300px] md:-rotate-45 rotate-[30] z-10  "
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
          className="absolute top-1/2 -translate-y-1/2 left-10 2xl:w-[350px] w-[300px] lg:block hidden"
        />
      </div>
      <div className="heroSection flex w-full -translate-y-20 z-20 flex-col justify-center items-center">
        <div className="left flex flex-col md:text-center w-full justify-center md:-translate-y-0">
          <h1 className="hero-text xl:text-9xl lg:text-8xl md:text-6xl text-5xl mt-20 mb-3 text-center md:-translate-y-0 text-red-600 md:mx-0 mx-auto">
            Valentine's Day Special
          </h1>
        </div>
        <div className="right w-full flex flex-col -ml-10 realtive justify-center items-center z-20">
          <div className="flex gap-4 flex-col items-center">
            <div className="top flex gap-5 flex-col">
              <div className="head text-center md:text-6xl text-2xl text-red-500">
                THank You
              </div>
              <div className="container flex md:flex-row flex-col justify-between items-center text-red-500 max-w-[700px] w-full px-4 gap-10 text-center text-xl">
                <div className="left">
                  Results will be announced ahead of valentine’s day
                </div>
                <div className="right">
                  If you love this initiative please consider donation to
                  purchase hosting.
                </div>
              </div>
            </div>
            <div className="bottom text-xl text-black">
              <div>Esewa: 9811826820</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
