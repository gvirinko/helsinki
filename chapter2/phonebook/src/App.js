import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilterName, setFilterName] = useState('');
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            })
    }, []);

    const addName = (event) => {
        event.preventDefault();
        if (persons.find(item => item.name === newName) && newName !== "") {
            window.alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons([...persons, { name: newName, number: newNumber }]);
            console.log(event.target.value);
            setNewName("");
            setNewNumber("");
        }
    }

    const handleChangeName = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    }

    const handleChangeNumber = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    }

    const handleFiltering = (event) => {
        event.preventDefault();
        setFilterName(event.target.value);
    }

  return (
    <div>
          <h2>Phonebook</h2>
          <Filter onChange={handleFiltering}/>
          <h3>Add a new:</h3>
          <PersonForm
              onChangeName={handleChangeName}
              onChangeNumber={handleChangeNumber}
              onClick={addName} />
          <h2>Numbers</h2>
          <Persons list={persons} filter={newFilterName}/>
    </div>
  )
}

export default App