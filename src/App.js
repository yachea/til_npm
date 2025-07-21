import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Bar from "./components/chart/Bar";
import Line from "./components/chart/Line";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route path="/bar" element={<Bar>About</Bar>}></Route>
        <Route path="/line" element={<Line>About</Line>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
