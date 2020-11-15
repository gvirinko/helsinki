const express = require('express');
const app = express();
app.use(express.json());

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
        {
        "name": "Ma4545454545k",
        "number": "39-23-6423122",
        "id": 5
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get('/info', (request, response) => {
    const infoText =
        [`Phonebook has info for ${persons.length} people.`,
        new Date()
        ]
    response.send(infoText);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const id = Math.floor((1 + Math.random()) * 0x1000);

    if (!body.name) {
        return response.status(400).json({error: 'Name is missing.'})
    } else if (!body.number) {
        return response.status(400).json({error: 'Number is missing.'})
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'Name must be unique.'})
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": id
    }
    persons = persons.concat(person);
    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));