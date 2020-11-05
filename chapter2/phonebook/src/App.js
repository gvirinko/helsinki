import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilterName, setFilterName] = useState('');

    const addName = (event) => {
        event.preventDefault();
        if (persons.find(item => item.name === newName) && newName !== "") {
            window.alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons([...persons, { name: newName, number: newNumber }]);
            setNewName("");
            setNewNumber("");

        }
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
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
              onNameChange={handleNameChange}
              onNumberChange={handleNumberChange}
              onClick={addName} />
          <h2>Numbers</h2>
          <Persons list={persons} filter={newFilterName}/>
    </div>
  )
}

export default App