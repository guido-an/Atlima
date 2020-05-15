const Spot = require('../models/Spot')
const Sport = require('../models/Sport')

async function addPostToSport (array, post) {
  array.forEach(async idInsideArray => {
    try{
     await Sport.findOneAndUpdate({ _id: idInsideArray }, { $push: { posts: post } } )
    } catch(err){
      console.log(err)
    }
  })
}


module.exports = {
  addPostToSport
}
