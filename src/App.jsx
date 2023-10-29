import { useState } from "react";
import { Filter, Form, Person } from "./Other";

const App = ({ data }) => {
  const [persons, setPersons] = useState(data);
  return (
    <div className="card">
      <div className="decoline line1"></div>
      <div className="gridline">
        <div className="decoline"></div>
        <div className="decoline"></div>
        <div className="decoline"></div>
      </div>
      <div className="header">
        <h1>Phonebook</h1>
        <p>
          In the hustle and bustle of life, amidst all your dreams and
          endeavors, never forget the precious bonds of family and friends.
        </p>
      </div>
      <Filter data={persons} />
      <Form data={persons} move={setPersons} />
      <Person data={persons} />
      <div className="decoline line2"></div>
    </div>
  );
};

export default App;
