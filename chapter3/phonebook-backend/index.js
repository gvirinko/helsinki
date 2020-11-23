require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

const Person = require('./models/person')

// Morgan
const morgan = require('morgan')
morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// CORS
const cors = require('cors')
app.use(cors())



// Get All
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Get By Id
app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Get Info
app.get('/info', (request, response) => {
  Person.find({})
    .then(result => {
      const infoText = [`Phonebook has info for ${result.length} people.`, new Date()]
      response.send(infoText)
    })
})

// Add New
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    'name': body.name,
    'number': body.number,
  })
  person
    .save()
    .then(savedPerson => { response.json(savedPerson) })
    .catch(() => {
      response.status(400).json({ error: 'name duplicate' })

    })
})

// Update
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => {
      console.log(error)
    })
})

// Delete
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => { response.status(204).end() })
    .catch(error => next(error))
})

// Unknown Endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Error Handling

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`))