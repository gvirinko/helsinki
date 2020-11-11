import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getItems = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data);
}

const addItem = (newItem) => {
    return axios
        .post(baseUrl, newItem)
        .then(response => response.data);
}

const updateItem = (id, newData) => {
    return axios
        .put((`${baseUrl}/${id}`), newData)
        .then(response => response.data);
}

const deleteItem = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`);
}

export default { getItems, addItem, updateItem, deleteItem };