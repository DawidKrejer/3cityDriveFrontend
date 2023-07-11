import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DriverCrud() {
    const [id, setId] = useState("");
    const [drivername, setName] = useState("");
    const [team, setCourse] = useState("");
    const [drivers, setUsers] = useState([]);
    
      useEffect(() => {
        (async () => await Load())();
      }, []);
    
      async function Load() {
        
        const result = await axios.get(`https://localhost:7007/api/Driver/GetDriver/`);
        setUsers(result.data);
        console.log(result.data);
      }
      async function save(event) {
      
        event.preventDefault();
        try {
          await axios.post("https://localhost:7007/api/Driver/AddDriver", {
            
            drivername: drivername,
            team: team,
          
          });
          alert("Drive Registation Successfully");
              setId("");
              setName("");
              setCourse("");
          
        
          Load();
        } catch (err) {
          alert(err);
        }
      }
     
      async function editDriver(drivers) {
        setName(drivers.drivername);
        setCourse(drivers.team);
      
        setId(drivers.id);
      }
     
      async function DeleteDriver(id) {
      await axios.delete("https://localhost:7007/api/Driver/DeleteDriver/" + id);
       alert("Employee deleted Successfully");
       setId("");
       setName("");
       setCourse("");
       Load();
      }
     
      async function update(event) {
        event.preventDefault();
        try {
     
      await axios.patch("https://localhost:7007/api/Driver/UpdateDriver/"+ drivers.find((u) => u.id === id).id || id,
            {
            id: id,
            drivername: drivername,
            team: team,
     
            }
          );
          alert("Registation Updated");
          setId("");
          setName("");
          setCourse("");
        
          Load();
        } catch (err) {
          alert(err);
        }
      }
    
    
    

  return (
    <div>
      <h2>Szczegóły wyścigu {id}</h2>
      <table>
        <thead>
          <tr>
            <th>Nazwa zawodnika</th>
            <th>Pozycja</th>
            {/* Dodaj inne kolumny */}
          </tr>
        </thead>
        <tbody>
          {drivers.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.position}</td>
              {/* Dodaj inne komórki */}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tabela kierowców</h2>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            {/* Dodaj inne kolumny */}
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.firstName}</td>
              <td>{driver.lastName}</td>
              {/* Dodaj inne komórki */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverCrud;
