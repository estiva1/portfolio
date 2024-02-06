import { Canvas, Layout } from "./App.styles";
import Cursor from "./components/cursor/cursor.component";
import { WebGL } from "./components/webgl/index.jsx";
import GlobalStyle from "./globalStyles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Cursor />
        <main style={{ flexGrow: 1 }}>
          <Canvas>
            <WebGL />
          </Canvas>
        </main>
      </Layout>
    </>
  );
};

export default App;
