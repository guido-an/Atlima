require('dotenv').config()

const mongoose = require('mongoose')
const Category = require('../models/Category')

mongoose
  .connect('http://localhost:5000/server', { useNewUrlParser: true })
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
    name: 'Skating'
  },
  {
    name: 'Running'
  },
  {
    name: 'Cycling'
  },
  {
    name: 'Workout'
  },
  {
    name: 'Water sports'
  },
  {
    name: 'Yoga'
  },
  {
    name: 'Climbing'
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
