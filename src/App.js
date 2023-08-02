import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import DriverCrud from "./component/DriverCrud";
import Race from "./component/Race";
import About from "./component/About";
import RaceDetails from "./component/RaceDetails";
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/driver" element={<DriverCrud />} />
        <Route path="/race" element={<Race />} />
        <Route path="/about" element={<About />} />
        <Route path="/race/:id" element={<RaceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
