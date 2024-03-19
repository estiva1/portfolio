import { useGLTF, Text, Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import shards from "../../models/shards.glb";

function Model() {
  const { viewport } = useThree();

  const { nodes } = useGLTF(shards);

  return (
    <group scale={viewport.width / 1.5}>
      {nodes.Scene.children.map((mesh, i) => {
        return <Mesh data={mesh} key={i} />;
      })}
      <Font />
    </group>
  );
}

function Font() {
  //const src = "../../fonts/NeueMontreal-Regular.woff";
  const textOption = {
    color: "white",
    anchorX: "center",
    anchorY: "middle",
  };
  return (
    <group>
      <Text position={[0, 0, -0.1]} fontSize={0.4} {...textOption}>
        404
      </Text>
      <Text position={[0, -0.15, -0.1]} fontSize={0.03} {...textOption}>
        The link is broken
      </Text>
    </group>
  );
}

function Mesh({ data }) {
  const materialProps = useControls({
    thickness: { value: 0.275, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.8, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.75, min: 0, max: 1 },
    resolution: { value: 300 },
  });

  return (
    <Float>
      <mesh {...data}>
        <MeshTransmissionMaterial roughness={0} transmission={0.99} {...materialProps} />
      </mesh>
    </Float>
  );
}

const NotFoundPage = () => {
  return (
    <Canvas orthographic style={{ background: "black", height: "100vh" }} camera={{ position: [0, 0, 1], zoom: 800 }}>
      <Model />
      <directionalLight intensity={3} position={[0, 0.1, 1]} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default NotFoundPage;
