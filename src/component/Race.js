// Race.js
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Race() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [race, setRace] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get("https://localhost:7007/api/Race/GetRace");
      setRace(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7007/api/Race/AddRace", {
        name: name,
        location: location,
      });
      alert("Race Added Successfully");
      setId("");
      setName("");
      setLocation("");
      Load();
    } catch (err) {
      console.log(err);
      alert("Failed to add race");
    }
  }

  async function editRace(race) {
    setId(race.id);
    setName(race.name);
    setLocation(race.location);
  }

  async function deleteRace(id) {
    try {
      await axios.delete(`https://localhost:7007/api/Race/DeleteRace/${id}`);
      alert("Race deleted successfully");
      setId("");
      setName("");
      setLocation("");
      Load();
    } catch (err) {
      console.log(err);
      alert("Failed to delete race");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(`https://localhost:7007/api/Race/UpdateRace/${id}`, {
        id: id,
        name: name,
        location: location,
      });
      alert("Race updated successfully");
      setId("");
      setName("");
      setLocation("");
      Load();
    } catch (err) {
      console.log(err);
      alert("Failed to update race");
    }
  }

  return (
    <div>
      <h1>Wyścigi</h1>
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button>Tor Gdańsk</button>
          </li>
          <li className="nav-item">
            <button>Tor Sopot</button>
          </li>
        </ul>

        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>Nazwa wyścigu</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Lokalizacja</label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Zarejestruj
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Aktualizuj
            </button>
          </div>
        </form>
      </div>
      <br />

      <table className="table" align="center">
        <thead>
          <tr>
            <th scope="col">ID Wyścigu</th>
            <th scope="col">Nazwa wyścigu</th>
            <th scope="col">Lokalizacja</th>
            <th scope="col">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {race.map((Race) => (
            <tr key={Race.id}>
              <th scope="row">{Race.id}</th>
              <td>{Race.name}</td>
              <td>{Race.location}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => editRace(Race)}
                >
                  Edytuj
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => deleteRace(Race.id)}
                >
                  Usuń
                </button>
                <Link to="/driver" className="link-driver">
                  Kierowcy
                </Link>
                <Link to={`/race/${Race.id}`} className="link-driver">
                  Nowy
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Race;
