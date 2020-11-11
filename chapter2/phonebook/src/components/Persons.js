import React, {useState} from 'react';
import personService from '../services/persons';
import Notification from './Notification';

const Persons = ({ list, filter }) => {
    const [idToDelete, setIdToDelete] = useState("");
    const [notificationType, setNotificationType] = useState();
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleDelete = (id) => {
        // Deleting an item from state and server
        const personToDelete = list.find(person => person.id === id);
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            setIdToDelete(id);
            personService
                .deleteItem(id)
                .catch(error => {
                    setNotificationMessage(`Information on ${personToDelete.name} has already been removed from server.`);
                    setNotificationType("error")
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000);
                });
        }
    }
    return (
        <div>
            <Notification type={notificationType} message={notificationMessage} />
            {list.filter(person => person.id !== idToDelete)
                 .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                 .map((person, i) =>
                    <p key={i}>{person.name}: {person.number}
                        <button onClick={() => handleDelete(person.id)}>Delete</button>
                    </p>
                )}
        </div>)
}

export default Persons