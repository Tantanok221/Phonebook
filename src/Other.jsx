import axios from "axios";
import { useState } from "react";

const BaseURL = "http://localhost:3000/persons/"

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
        <>
            filter shown with <input id="FILTER" onChange={filter}></input>
        </>
    );
};





function findID(name,data) {
    return data.find(person => person.name === name ).id
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
            if(window.confirm(`${name}? is already added to phonebook, replace the old number with a new one?`)) {
                id = findID(name,data)
                axios.put(BaseURL + id, {name,number,id})
                window.location.reload(true)
                
            };
        }
    }

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    name: <input id="NAME" /> <br></br>
                    number: <input id="NUMBER" />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};

const Person = ({ data,move }) => {
    function click(event,ho) {
        
        const name = event.currentTarget.getAttribute("name")
        const id = event.currentTarget.getAttribute("id")
        if(window.confirm(`Do you really want to delete ${name}?`)) {
            axios.delete(BaseURL + id).then(response => {console.log(response)})
            window.location.reload(true)
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
                        <button onClick={click} name={val.name} id={val.id}>Delete</button>
                    </>
                ))}
            </div>
        </>
    );
};

export { Filter, Form, Person };
