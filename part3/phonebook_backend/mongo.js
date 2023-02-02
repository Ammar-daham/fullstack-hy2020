const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.suvv0aa.mongodb.net/phonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    console.log(result)
    //mongoose.connection.close()
})

Person.find({}).then(persons => {
    console.log('phonebook: ')
    persons.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
})
