import { useSelector } from "react-redux";
import { Router } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Navigation/Header";
import Game from "./Pages/Game";
import Home from "./Pages/Home";

import Profile from "./Pages/Profile";
import SocketClient from "./Socket";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <SocketClient />
    </BrowserRouter>
  );
}

export default App;
