import React from 'react';

const Persons = ({ list, filter }) => {
    return <div>
        {list.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
             .map((person, i) =>
                <p key={i}>{person.name}: {person.number}</p>)}
    </div>;
}

export default Persons