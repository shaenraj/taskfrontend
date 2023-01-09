// import React, {useEffect, useCallback} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddUser from "./pages/AddUser";
import Core from "./container/core";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
      <Core />
    </BrowserRouter>
  );
}

export default App;
