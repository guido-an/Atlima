import React from 'react'
import { GET_CATEGORIES } from '../api/categoryAPI'
import { ADD_CATEGORIES } from '../api/userAPI'
import AuthContext  from '../contexts/AuthContext'


class OnBoarding extends React.Component {
  static contextType = AuthContext

  state = {
    categories: [],
    selectedCategoriesIds: []
  }
  async componentDidMount(){
    this.getCategories()
 }

getCategories = async () => {
  try {
      const categories = await GET_CATEGORIES()
      this.setState({ categories: categories })
     } 
      catch(err){
        console.log(err)
    }
 }

 onSelect = e => {
  const { name } = e.target;
  if(e.target.checked){
    this.setState({
      selectedCategoriesIds: [...this.state.selectedCategoriesIds, name],
    })
  } else {
    this.removeCategory(name)
  }
}

removeCategory = (name) => {
  let myArray = [...this.state.selectedCategoriesIds]
    if(myArray.includes(name)){
      const newArray = myArray.filter(category => {
        return category !== name
      })
      this.setState({ selectedCategoriesIds: newArray })
    }
  }

  onSubmit = async e => {
    const userId = this.context.loggedInUser._id
    e.preventDefault();
      try {
        await ADD_CATEGORIES(this.state.selectedCategoriesIds)
        this.props.history.push(`/profile/edit/${userId}`)
    }  catch(err){
          console.log(err)
     }
  };


  render () {
    return (
      <div>
        <h1>OnBoarding</h1>
      {this.state.categories.map(category => {
        return (
          <div key={category._id}>
          <span>{category.name}</span>
          <input onChange={this.onSelect} type="checkbox" name={category._id}/>
        </div>
        )
      })}

      <form onSubmit={this.onSubmit}>
        <button>Next</button>
      </form>
      </div>
    )
  }
}

export default OnBoarding
