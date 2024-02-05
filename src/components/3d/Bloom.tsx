import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector2, Color, ColorManagement, SRGBColorSpace } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export function useBloom() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();
  const [sceneEvents] = useState(() => new Set());
  gl.setClearColor(new Color("hsl(330, 100%, 25%)"));
  ColorManagement.enabled = true;
  gl.outputColorSpace = SRGBColorSpace;

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      2,
      0.4,
      0.85
    );
    composer.current.addPass(bloomPass);
    composer.current.renderToScreen = false;

    sceneEvents.add({ disconnect: () => composer.current?.dispose() });
    return () => sceneEvents.forEach((v) => v.disconnect());
  }, []);
  useFrame(() => composer.current.render(), 1);
  return composer;
}
