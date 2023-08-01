import React from "react";
import "./styles/reset.css";
import { Routes, Route } from "react-router-dom";
import MainBTNav from "./components/MainBTNav";
import Main from "./pages/Main";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainBTNav />}>
          <Route index element={<Main />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
