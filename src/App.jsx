import { useState } from "react";
import { Filter, Form, Person } from "./Other";

const App = ({ data }) => {
    const [persons, setPersons] = useState(data);
    return (
        <div className="card">
            <div className="decoline"></div>
            <div className="header">
                <h1>Phonebook</h1>
                <p>
                    In the hustle and bustle of life, amidst all your dreams and
                    endeavors, never forget the precious bonds of family and
                    friends.
                </p>
            </div>

            <Filter data={persons} />

            <h2>Add new</h2>
            <Form data={persons} move={setPersons} />

            <h2>Numbers</h2>
            <Person data={persons} />
            <div className="decoline"></div>
        </div>
    );
};

export default App;
