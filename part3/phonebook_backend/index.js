require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':date[iso] :method :url :http-version :user-agent :status (:response-time ms) :body'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const date = new Date()





app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
  res.send(`<p>PhoneBook has info for ${persons.length} people</p>
     <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  // console.log(persons)
  // res.json(persons)
})

app.get('/api/persons/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const person = await Person.findById(id)

    if (person) {
        console.log(person)
        res.json(person)
    } else {
        res.status(404).send('Person not found')
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    console.log(id)
    return id
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
          error: 'name or number is missing',
        })
    } 
    
    persons.map(person => {
        if(person.name === body.name) {
            console.log(person.name === body.name)
            return res.status(400).json({
                error: 'name must be unique'
            }).end()
        } 
    })

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
    persons = persons.concat(person)
    
    res.json(person)
    


})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
