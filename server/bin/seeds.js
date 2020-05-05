// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const Sport = require('../models/Sport')

mongoose
  .connect('mongodb://localhost/server', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

const sports = [
  {
    name: 'Muay Thai'
  },
  {
    name: 'Roller Skating'
  },
  {
    name: 'Running'
  }
]

Sport.deleteMany()
  .then(() => {
    return Sport.create(sports)
  })
  .then(sportsCreated => {
    console.log(`${sportsCreated.length} users created with the following id:`)
    console.log(sportsCreated.map(u => u._id))
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
