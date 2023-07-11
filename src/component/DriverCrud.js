import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function DriverCrud() {
  const [id, setId] = useState("");
  const [drivername, setName] = useState("");
  const [team, setCourse] = useState("");
  const [drivers, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("https://localhost:7007/api/Driver/GetDriver");
    setUsers(result.data);
    console.log(result.data);
  }

  function searchDrivers() {
    const filteredDrivers = drivers.filter((driver) => {
      return driver.drivername.toLowerCase().includes(search.toLowerCase());
    });

    filteredDrivers.sort((a, b) => {
      const isSelectedA = selectedDriverIds.includes(a.id);
      const isSelectedB = selectedDriverIds.includes(b.id);

      if (isSelectedA && isSelectedB) {
        return 0;
      } else if (isSelectedA) {
        return -1;
      } else if (isSelectedB) {
        return 1;
      } else {
        return 0;
      }
    });

    setUsers(filteredDrivers);
  }

  function resetSearch() {
    setSearch("");
    Load();
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7007/api/Driver/AddDriver", {
        drivername: drivername,
        team: team,
      });
      alert("Drive Registration Successful");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editDriver(driver) {
    setName(driver.drivername);
    setCourse(driver.team);
    setId(driver.id);
  }

  async function DeleteDriver(id) {
    await axios.delete("https://localhost:7007/api/Driver/DeleteDriver/" + id);
    alert("Driver deleted successfully");
    setId("");
    setName("");
    setCourse("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch("https://localhost:7007/api/Driver/UpdateDriver/" + (drivers.find((u) => u.id === id)?.id || id), {
        id: id,
        drivername: drivername,
        team: team,
      });
      alert("Registration updated");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  function handleCheckboxChange(driverId) {
    if (selectedDriverIds.includes(driverId)) {
      setSelectedDriverIds(selectedDriverIds.filter((id) => id !== driverId));
    } else {
      setSelectedDriverIds([...selectedDriverIds, driverId]);
    }
  }

  return (
    <div>
      <h1>Kierowcy</h1>
      <div className="container mt-4">
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
            <label>Nazwa Kierowcy</label>
            <input
              type="text"
              className="form-control"
              id="drivername"
              value={drivername}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Drużyna</label>
            <input
              type="text"
              className="form-control"
              id="team"
              value={team}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Rejestruj
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Aktualizuj
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="container">
        <div className="mb-3">
          <label>Wyszukaj po nazwie kierowcy:</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button className="btn btn-primary ms-2" onClick={searchDrivers}>
              Szukaj
            </button>
            <button className="btn btn-secondary ms-2" onClick={resetSearch}>
              Resetuj
            </button>
          </div>
        </div>
      </div>
      <br />
      <table className="table" align="center">
        <thead>
          <tr>
            <th scope="col">ID Kierowcy</th>
            <th scope="col">Nazwa Kierowcy</th>
            <th scope="col">Drużyna</th>
            <th scope="col">Opcje</th>
            <th scope="col">Zaznacz</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.drivername}</td>
              <td>{driver.team}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editDriver(driver)}
                >
                  Edytuj
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteDriver(driver.id)}
                >
                  Usuń
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedDriverIds.includes(driver.id)}
                  onChange={() => handleCheckboxChange(driver.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverCrud;
