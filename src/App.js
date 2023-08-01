import React from "react";
import "./styles/reset.css";
import { Routes, Route } from "react-router-dom";
import MainBTNav from "./components/MainBTNav";
import Main from "./pages/Main";
import Check from "./pages/Check";
import Favorite from "./pages/Favorite";
import Chat from "./pages/Chat";
import Mypage from "./pages/Mypage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainBTNav />}>
          <Route index element={<Main />} />
          <Route path="check" element={<Check />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="chat" element={<Chat />} />
          <Route path="mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
