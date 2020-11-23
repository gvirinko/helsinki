import React from 'react';

const PersonForm = ({ onChangeName, onChangeNumber, onClick, name, number }) => {
    return (
        <form>
            <div>
                Name: <input value={name} onChange={onChangeName} />
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit" onClick={onClick}>add</button>
            </div>
        </form>);
}

export default PersonForm;
