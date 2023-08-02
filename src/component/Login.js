import React, { useEffect, useState } from "react";
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Auth/login', loginData);
      console.log('Zalogowano pomyślnie:', response.data);
    } catch (error) {
      console.error('Błąd logowania:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Login:</label>
          <input
            type="text"
            name="login"
            value={loginData.login}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;