import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname !== "/contact" && <Main />}
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
