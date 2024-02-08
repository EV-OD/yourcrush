import "../match.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import useApp from "../hooks/useApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

function Matched() {
  const { db, auth } = useApp();
  const [user] = useAuthState(auth);
  const [isMatched, setIsMatched] = useState(false);

  const getIfMatched = async () => {
    if (user) {
      const docRef = doc(db, "matchedCrush", user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : false;
    }
    return false;
  };
  useEffect(() => {
    (async () => {
      let res = await getIfMatched();
      if (res) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
    })();
  }, [user]);

  return (
    <div>
      <div>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title">
          {isMatched ? (
            <>
              <span>YOU</span>
              <br />
              <span>ARE MATCHED ❤❤</span>
            </>
          ) : (
            <span>Not Matched Yet</span>
          )}
        </div>
      </div>
      {isMatched && <ConfettiComponent />}
    </div>
  );
}

function ConfettiComponent() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}

export default Matched;
