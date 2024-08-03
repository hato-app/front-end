import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider, { useAppContext } from "./AppContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";

const App = () => {
  const useAppState = useAppContext();

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Index></Index>}></Route>
            <Route
              path="login"
              element={!useAppState.user ? <Login></Login> : <Index></Index>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
