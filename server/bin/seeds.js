// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const Category = require('../models/Category')

mongoose
  .connect('mongodb+srv://carucciguido:Mongo2019!@backenddb-4fty3.mongodb.net/altima', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

const categories = [
  {
    name: 'Martial Arts'
  },
  {
    name: 'Roller Skating'
  },
  {
    name: 'Running'
  },
  {
    name: 'Cycling'
  },
  {
    name: 'Fitness'
  },
  {
    name: 'Surfing'
  }
]

Category.deleteMany()
  .then(() => {
    return Category.create(categories)
  })
  .then(categoriesCreated => {
    console.log(`${categoriesCreated.length} users created with the following id:`)
    console.log(categoriesCreated.map(u => u._id))
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
