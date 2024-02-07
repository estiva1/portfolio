import React from "react";
import Layout from "../../layout/layout.component";
import { Canvas } from "./home.styles";
import { WebGL } from "../../components/webgl";

const Home = () => {
  return (
    <Layout>
      <Canvas>
        <WebGL />
      </Canvas>
    </Layout>
  );
};

export default Home;
