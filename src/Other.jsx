import axios from "axios";
import { useState } from "react";
import {
  
  FiUser,
  FiPhone,
  FiPlusCircle,
  FiTrash2,
} from "react-icons/fi";
const BaseURL = "http://localhost:3000/persons/";



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

const Person = ({ data }) => {
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
        {data.map((val, i) => (
          <div key={val.id} className="dataBox">
            <h3>{val.id}</h3>
            <div className="userName">
              <FiUser className="userIcon" /> {val.name}
            </div>
            <div className="phoneNumber">
              <FiPhone className="phoneIcon" />
              {val.number}
            </div>
            <button onClick={click} name={val.name} id={val.id}>
              <FiTrash2 className="trashIcon" />
              Delete Contact
            </button>
            <div className="widthline"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export { Form, Person };
