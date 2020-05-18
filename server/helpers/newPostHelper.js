const Spot = require('../models/Spot')
const Category = require('../models/Category')

async function addPostToCategory (array, post) {
  array.forEach(async idInsideArray => {
    try{
     await Category.findOneAndUpdate({ _id: idInsideArray }, { $push: { posts: post } } )
    } catch(err){
      console.log(err)
    }
  })
}


module.exports = {
  addPostToCategory
}
