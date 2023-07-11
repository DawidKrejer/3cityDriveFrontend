import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="container">
      <nav className="nav">

        <Link to="/race" className="link">
        Zapisz się
        </Link>
        <Link to="/about" className="link">
          O nas
        </Link>
      </nav>
      <div className="content">
        <h1 className="heading">Witaj na 3CITY DRIVE CHALLENGE!</h1>
        <div className="description-container">
        <p className="description">Wyścigowa przygoda w sercu Trójmiasta!</p>
          <p className="description">Poczuj moc i zawładnij ulicami Trójmiasta w 3City Drive Challenge!</p>
          <p className="callToAction">Czekają cię niezapomniane wrażenia! </p>
        </div>
        <img src="/images/flags.jpg" alt="Flagi" className="image" />
      </div>
    </div>
  );
}

export default HomePage;