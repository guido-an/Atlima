import '../scss/onboarding.scss'
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
      <div className='category ui secondary fluid three item'>
        <div className='onboarding'>
          {this.props.categoryContext.allCategories.map(category => {
            return (
                <div key={category._id} className='item'>
                  <label className='container'>
                  <input onChange={this.props.categoryContext.onSelectCategories} type='checkbox' name={category._id} />
                  <span className={`checkmark  ${category.name}`}></span>
                  <label className="cat-name">{category.name}</label>
                  </label>
                </div>
            )
          })}
        </div>
        <form onSubmit={this.onSubmitUserCategories}>
        {this.props.categoryContext.selectedCategoriesIds.length >= 1 ? <button>Next</button> : ''}
        </form>
      </div>
    )
  }
}

export default CategoriesOnBoarding
