import React from 'react';

const Filter = ({ onChange }) => {
    return <p>Filter by name: <input onChange={onChange} /></p>
}

export default Filter;