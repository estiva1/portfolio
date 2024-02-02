import { Layout } from "./App.styles";
import Cursor from "./components/cursor/cursor.component";
import GlobalStyle from "./globalStyles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Cursor />
      </Layout>
    </>
  );
};

export default App;
