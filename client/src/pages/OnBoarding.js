import React from 'react'
import { Redirect } from 'react-router-dom'
import CategoryContext from '../contexts/CategoryContext'

import CategoriesOnBoarding from '../components/Categories/CategoriesOnBoarding'

class OnBoarding extends React.Component {
  static contextType = CategoryContext
  render () {
    return (
      <div id="onboarding-page-container">
        <h1 className="onb-title">Choose the sports you enjoy</h1>
        <CategoriesOnBoarding categoryContext={this.context} />
      </div>
    )
  }
}

export default OnBoarding
