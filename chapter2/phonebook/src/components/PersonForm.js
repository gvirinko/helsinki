import React from 'react';

const PersonForm = ({ onNameChange, onNumberChange, onClick }) => {
    return (
        <form>
            <div>
                Name: <input onChange={onNameChange} />
            </div>
            <div>
                Number: <input onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={onClick}>add</button>
            </div>
        </form>);
}

export default PersonForm;
