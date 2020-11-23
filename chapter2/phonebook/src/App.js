import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'

const App = () => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilterName, setFilterName] = useState('');
    const [persons, setPersons] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState();
    const [notificationType, setNotificationType] = useState();



    useEffect(() => {
        // Getting data from server and saving to state
        personService
            .getItems()
            .then(initialList => setPersons(initialList))
            .catch(error => {
                setNotificationMessage("No connection with server.");
                setNotificationType("error");
            });
    }, []);

    const addName = (event) => {
        event.preventDefault();
        // Checking the length constrains
        if (newName.length < 3) {
            setNotificationMessage("Name should have more than three characters.");
            setNotificationType("error");
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000);
            setNewName("");
            setNewNumber("");
            return;
        }
        if (newNumber.length < 8) {
            setNotificationMessage("Number should have more than eight characters.");
            setNotificationType("error");
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000);
            setNewName("");
            setNewNumber("");
            return;
        }
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
                    .catch(error => {
                        setNotificationMessage("An error occured.");
                        setNotificationType("error");
                    });
            }
        }
        else {
            const newObject = { name: newName, number: newNumber }
            // Creating new item (name + number) in the phonebook, adding to state and sending to server
            personService
                .addItem(newObject)
                .then(newPerson => {
                    setPersons([...persons, newPerson]);
                    setNotificationMessage(`Added ${newPerson.name}`);
                    setNotificationType("success");
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000);
                    setNewName("");
                    setNewNumber("");
                })
                .catch(error => {
                    console.log("error shmerror");
                    setNotificationMessage("An error occured.");
                    setNotificationType("error");
                });
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
            <Notification type={notificationType} message={notificationMessage} />
            <Filter onChange={handleFiltering} />
            <h3>Add a new entry:</h3>
            <PersonForm
                onChangeName={handleChangeName}
                onChangeNumber={handleChangeNumber}
                onClick={addName}
                name={newName}
                number={newNumber}
            />
            <h2>Numbers</h2>
            <Persons list={persons} filter={newFilterName} />
        </div>
    )
}

export default App