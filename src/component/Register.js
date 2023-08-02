import React, { useState } from "react";
import axios from 'axios';

function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/api/Users/register", {
        login: login,
        password: password,
        email: email,
      });
      console.log('Zarejestrowano pomyślnie:', response.data);
      alert("User Added Successfully");
      setLogin("");
      setPassword("");
      setEmail("");
    } catch (err) {
      console.log(err);
      alert("Failed to add user");
    }
  }

  return (
    <div>
      <h2>Rejestracja</h2>
      <div>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-4" onClick={handleRegister}>
        Zarejestruj
      </button>
    </div>
  );
};

export default Register;
