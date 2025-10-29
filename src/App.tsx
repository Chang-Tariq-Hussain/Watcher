import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
