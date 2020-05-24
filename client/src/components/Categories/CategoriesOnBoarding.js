import React from 'react'
import { Redirect } from 'react-router-dom'

class CategoriesOnBoarding extends React.Component {
  state = { redirect: false }

  componentDidMount () {
    this.props.categoryContext.cleanSelectedCategoriesIds()
    this.props.categoryContext.getCategories()
  }

 onSubmitUserCategories = (e) => {
  this.props.categoryContext.onSubmitUserCategories(e)
  this.setState({ redirect: true })
 }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
        {this.props.categoryContext.allCategories.map(category => {
          return (
            <div key={category._id}>
              <span>{category.name}</span>
              <input onChange={this.props.categoryContext.onSelectCategories} type='checkbox' name={category._id} />
            </div>
          )
        })}
        <form onSubmit={this.onSubmitUserCategories}>
          <button>Next</button>
        </form>
      </div>
    )
  }
}

export default CategoriesOnBoarding
