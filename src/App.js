import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import DriverCrud from "./component/DriverCrud";
import Race from "./component/Race";
import About from "./component/About";
import RaceDetails from "./component/RaceDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/driver" element={<DriverCrud />} />
        <Route path="/race" element={<Race />} />
        <Route path="/about" element={<About />} />
        <Route path="/race/:id" element={<RaceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
