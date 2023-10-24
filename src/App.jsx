import { useState } from "react";
import { Filter, Form, Person } from "./Other";

const App = ({ data }) => {
    
    const [persons, setPersons] = useState(data);
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter data={persons} />

            <h2>Add new</h2>
            <Form data={persons} move={setPersons} />

            <h2>Numbers</h2>
            <Person data={persons} />
        </div>
    );
};

export default App;
