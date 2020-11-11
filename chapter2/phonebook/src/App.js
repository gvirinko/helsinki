import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilterName, setFilterName] = useState('');
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        // Getting data from server and saving to state
        personService
            .getItems()
            .then(initialList => {
                setPersons(initialList);
            })
    }, []);

    const addName = (event) => {
        event.preventDefault();
        // Checking if the name and number already exist in the phonebook
        if (persons.find(item => item.name === newName && item.number === newNumber) && newName !== "") {
            window.alert(`${newName} is already added to the phonebook`);
        }
        // Checking if the name exists, but the number is different
        else if (persons.find(item => item.name === newName && item.number !== newNumber) && newName !== "") {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
                // Updating the number to server and updating state
                const oldPerson = persons.find(person => person.name === newName);
                const updPerson = { ...oldPerson, number: newNumber };
                personService
                    .updateItem(oldPerson.id, updPerson)
                    .then(updPerson => {
                        setPersons(persons.map(person => person.id !== updPerson.id ? person : updPerson));
                        setNewNumber("");
                    })
            }
        }
        else {
            const newObject = { name: newName, number: newNumber }
            // Creating new item (name + number) in the phonebook, adding to state and sending to server
            personService
                .addItem(newObject)
                .then(newPerson => {
                    setPersons([...persons, newPerson]);
                    setNewName("");
                    setNewNumber("");
                })
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