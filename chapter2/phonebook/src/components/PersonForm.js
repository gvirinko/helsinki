import React from 'react';

const PersonForm = ({ onChangeName, onChangeNumber, onClick }) => {
    return (
        <form>
            <div>
                Name: <input onChange={onChangeName} />
            </div>
            <div>
                Number: <input onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit" onClick={onClick}>add</button>
            </div>
        </form>);
}

export default PersonForm;
