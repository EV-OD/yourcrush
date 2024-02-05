import { Clock, Vector3 } from "three";
import Flower from "../components/3d/flowerScene";
import { OrbitControls, Plane, Html } from "@react-three/drei";
import { useBloom } from "../components/3d/Bloom";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import useTimingStore from "../store/timing";
import { set } from "firebase/database";

function ModelScene2() {
  const { camera } = useThree();
  const { isInitialAnimationFinished } = useTimingStore();
  function moveCamera() {
    let vec3 = new Vector3(-23, 5, 0);
    camera.position.lerp(vec3, 0.02);
    camera.lookAt(0, 0, 0);
  }

  useEffect(() => {
    let id;
    if (isInitialAnimationFinished) {
      id = setInterval(() => {
        moveCamera();
      }, 10);
    }
    if (id) {
      return () => clearInterval(id);
    }
  }, [isInitialAnimationFinished]);

  return (
    <>
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial attach="material" color="rgb(200,104,128)" />
      </Plane>
      <spotLight position={[0, 10, 0]} intensity={200} penumbra={0.2} />
    </>
  );
}

export default ModelScene2;
