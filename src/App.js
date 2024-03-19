import GlobalStyle from "./globalStyles";
import Home from "./pages/home/home.component";
import NotFoundPage from "./pages/not-found-page/not-found-page.component";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Home />
      {/* <NotFoundPage /> */}
    </>
  );
};

export default App;
