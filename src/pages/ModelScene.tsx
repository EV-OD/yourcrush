import { Clock } from "three";
import Flower from "../components/3d/flowerScene";
import { OrbitControls, Plane, Html } from "@react-three/drei";
import { useBloom } from "../components/3d/Bloom";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function ModelScene() {
  const clock = new Clock();
  const ref = useRef();
  const [rotationY, setRotationY] = useState(0);

  useFrame(() => {
    setRotationY((rotationY) => {
      return rotationY + 0.01;
    });
    ref.current.rotation.y = rotationY;
  });
  return (
    <>
      <group scale={4} position={[0, -1, 0]} ref={ref}>
        <Flower />
      </group>
      <OrbitControls />
      {/* <axesHelper args={[5]} /> */}
      <Plane
        args={[100, 100]}
        rotation={[0, 0, -Math.PI / 2]}
        position={[0, 100, 0]}
        material-color="rgb(91,54,128)"
      />
      <group>
        <pointLight position={[0, 0, 100]} intensity={1000} />
        <pointLight position={[-5, 0, -5]} intensity={20} />
        <pointLight position={[5, 0, -5]} intensity={20} />
        <spotLight position={[0, 0, 10]} intensity={200} />
      </group>
    </>
  );
}

export default ModelScene;
