import '../scss/onboarding.scss'
import React from 'react'
import { Redirect } from 'react-router-dom'

import SelectionCategories from './SelectionCategories'

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
        <SelectionCategories categoryContext={this.props.categoryContext}/>
        <form onSubmit={this.onSubmitUserCategories}>
          {this.props.categoryContext.selectedCategoriesIds.length >= 1 ? <button>Done</button> : ''}
        </form>
      </div>
    )
  }
}

export default CategoriesOnBoarding
