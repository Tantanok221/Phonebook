import axios from "axios";
import { useState } from "react";
import { FiSearch, FiUser, FiPhone, FiPlusCircle } from "react-icons/fi";
const BaseURL = "http://localhost:3000/persons/";

const Filter = ({ data }) => {
  function filter(event) {
    let filter = document.querySelector("#FILTER").value;
    let newArr = data
      .map((val) => val.name + " " + val.number)
      .filter((val) => val.includes(filter));
    document.querySelector("#manipulate").innerHTML = "";
    newArr.forEach((val) => {
      document
        .querySelector("#manipulate")
        .insertAdjacentHTML("beforeend", `<p>${val}</p>`);
    });
    // TODO: Searching function still have some bugs
  }

  return (
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
  );
};

function findID(name, data) {
  return data.find((person) => person.name === name).id;
}

const Form = ({ data, move }) => {
  function submit(event) {
    let name = document.querySelector("#NAME").value;
    let number = document.querySelector("#NUMBER").value;
    let id = data.length + 1;
    event.preventDefault();

    if (!data.map((person) => person.name).includes(name)) {
      let newPerson = [...data, { name: name, number: number }];
      // TODO: ID sometime dosent work as intended
      axios
        .post(BaseURL, { name, number })
        .then((response) => console.log(response));
      move(newPerson);
    } else {
      if (
        window.confirm(
          `${name}? is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        id = findID(name, data);
        axios.put(BaseURL + id, { name, number, id });
        window.location.reload(true);
      }
    }
  }

  return (
    <form onSubmit={submit} className="addForm">
      <div className="addName">
        <FiUser id="userIcon" />
        <input id="NAME" placeholder="Insert Name ..." />
      </div>
      <div className="addNumber">
        <FiPhone id="phoneIcon" />
        <input id="NUMBER" placeholder="Insert Number ..." />
      </div>
      <button className="submitForm" type="submit">
        <FiPlusCircle className="addIcon" />
        Add To Contact
      </button>
      <div className="widthline" id="FormLine"></div>
    </form>
  );
};

const Person = ({ data, move }) => {
  function click(event, ho) {
    const name = event.currentTarget.getAttribute("name");
    const id = event.currentTarget.getAttribute("id");
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      axios.delete(BaseURL + id).then((response) => {
        console.log(response);
      });
      window.location.reload(true);
    }
  }

  return (
    <>
      <div id="manipulate">
        {data.map((val) => (
          <>
            <p key={val.id}>
              {val.name} {val.number}
            </p>
            <button onClick={click} name={val.name} id={val.id}>
              Delete
            </button>
          </>
        ))}
      </div>
    </>
  );
};

export { Filter, Form, Person };
