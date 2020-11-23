import { connect, Schema, model, connection } from 'mongoose'

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]

const url = `mongodb+srv://helsinki:${password}@cluster0.rtgef.mongodb.net/phonebook?retryWrites=true&w=majority`

connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new Schema({
  name: String,
  number: String
})

const Person = model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
    connection.close()
  })
} else {
  const person = new Person({
    name: inputName,
    number: inputNumber
  })

  person
    .save()
    .then(() => {
      console.log(`added ${inputName} number ${inputNumber} to phonebook
    `)
      connection.close()
    })
}


