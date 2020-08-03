import React from 'react'
import '../scss/onboarding.scss'

class SelectionCategories extends React.Component {
  render () {
    return (
      <div className='category ui secondary fluid three item'>
        <div className='onboarding'>
          {this.props.categoryContext.allCategories.map(category => {
            return (
              <div key={category._id} className='item'>
                <label className='container'>
                  <input onChange={this.props.categoryContext.onSelectCategories} type='checkbox' name={category._id} checked={this.props.categoryContext.selectedCategoriesIds.includes(category._id) && true} />
                  <span className={`checkmark  ${category.name}`} />
                  <label className='cat-name'>{category.name}</label>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SelectionCategories
