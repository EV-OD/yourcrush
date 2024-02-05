import useApp from "../hooks/useApp";
import topleft from "../assets/topleft.png";
import topright from "../assets/topright.png";
import bottomright from "../assets/bottomright.png";
import arrowman from "../assets/arrowman.png";
import { useEffect, useState } from "react";
import couple2 from "../assets/couple2.png";
import flyinghearts from "../assets/flyinghearts.png";
import usePageStore from "../store/pageStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { SHA256 } from "crypto-js";
import { useCFirestore } from "../utils";

function hashString(str: string) {
  const hashedStr = SHA256(str).toString();
  return hashedStr;
}

function HashPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useApp();
  const [user] = useAuthState(auth);
  const { setCurrentPage, crushDetail } = usePageStore();
  const [loveHash, setLoveHash] = useState("");

  const findLoveHash = () => {
    let me = user?.displayName?.toLowerCase();
    let crush = crushDetail.fullname?.toLowerCase();
    let myEmail = user?.email?.toLowerCase(); // 079bct065.rabin@pcampus.edu
    let myRollNumber = myEmail?.split("@")[0].split(".")[0]; // 079bct065
    let crushRollNumber = crushDetail.roll_number;
    if (me) {
      if (me > crush) {
        return {
          hash: hashString(myRollNumber + crushRollNumber),
          text: myRollNumber + crushRollNumber,
        };
      }
    } else {
      console.log("Error in finding love hash");
    }
  };

  useEffect(() => {
    let hash = findLoveHash();
    if (hash) {
      setLoveHash(hash.hash);
    }
  }, []);

  const { addCrush } = useCFirestore();

  const handleLockCrush = async () => {
    setIsLoading(true);
    let hash = findLoveHash();
    if (hash) {
      setLoveHash(hash.hash);
      await addCrush(user, hash.hash);
    }
    setIsLoading(false);
    setCurrentPage("thankyou");
  };

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
            <div className="top flex md:flex-row flex-col items-center md:gap-10 w-max md:mt-0 mt-5">
              <div className="left">
                <h1 className="font-newSun text-red-600 md:text-5xl text-2xl">
                  YOU
                </h1>
                <span className="text-xl text-red-400">
                  Name:{user?.displayName}
                </span>
              </div>
              <div className="mid">
                <img
                  src={flyinghearts}
                  alt="love"
                  className="md:w-[100px] w-[50px]"
                />
              </div>
              <div className="right">
                <h1 className="font-newSun text-red-600 md:text-5xl text-2xl">
                  Crush
                </h1>
                <span className="text-xl text-red-400">
                  Name: {crushDetail.fullname}
                </span>
              </div>
            </div>
            <div className="bottom flex gap-4 flex-col">
              <h1 className=" text-red-600 md:text-5xl text-2xl mt-10">
                Your Love Hash
              </h1>
              <p className="text-xl font-semibold text-black w-60 text-ellipsis overflow-hidden">
                {loveHash}
              </p>
              <div className="button_group flex gap-4">
                <button
                  onClick={handleLockCrush}
                  className="sign-out bg-pink-400 hover:bg-pink-500 w-max text-white font-bold py-1 px-4 rounded text-base mt-3 flex items-center justify-center gap-4"
                >
                  <span>Lock Crush</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("home");
                  }}
                  className="sign-out bg-pink-400 hover:bg-pink-500 w-max text-white font-bold py-1 px-4 rounded text-base mt-3 flex items-center justify-center gap-4"
                >
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HashPage;
