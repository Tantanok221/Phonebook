import { useState } from "react";
import { Form, Person } from "./Other";
import { FiSearch } from "react-icons/fi";
const App = ({ data }) => {
  const [persons, setPersons] = useState(data);

  function filter(event) {
    let filter = document
      .querySelector("#FILTER")
      .value.replace(/\s/g, "")
      .toLowerCase();
    let nameTrim = data.map((val, i) =>
      val.name.replace(/\s/g, "").toLowerCase()
    );

    let filterID = [];
    nameTrim.forEach((val, i) => {
      if (val.includes(filter)) filterID.push(i + 1);
    });

    let filterData = data.filter((val) => filterID.includes(val.id));

    setPersons(filterData);
    if (document.querySelector("#FILTER").value == "") setPersons(data);
  }
  return (
    <>
    <div className="grainy"></div>
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
      <div className="searchArea">
        <div className="searchBox">
          <FiSearch className="searchIcon" />

          <input
            id="FILTER"
            onChange={filter}
            className="searchBox"
            placeholder="Search ..."
          ></input>
        </div>
      </div>
      <Form data={persons} move={setPersons} />
      <Person data={persons} />
      <div className="decoline line2"></div>
    </div>

    </>
      );
};

export default App;
