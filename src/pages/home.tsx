import LoveWaiting from "../components/widgets/loveWaiting";
import { useEffect, useRef, useState } from "react";
import useTimingStore from "../store/timing";
import Intro from "./intro";
import usePageStore from "../store/pageStore";

function Home() {
  const [opacity, setOpacity] = useState(0);
  const { setInitialAnimationFinished } = useTimingStore();

  useEffect(() => {
    let id;
    id = setTimeout(() => {
      setOpacity(1);
      setInitialAnimationFinished(true);
    }, 6500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="w-full h-full ">
      <div style={{ opacity: opacity }} className="w-full h-full">
        <Intro />
      </div>
      <LoveWaiting />
    </div>
  );
}

export default Home;
