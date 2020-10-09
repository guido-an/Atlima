import React from 'react'
import '../scss/onboarding.scss'

class SelectionCategories extends React.Component {
  changeCheckLabel = (e) => {
    this.props.categoryContext.onSelectCategories(e)
    if(e.currentTarget.checked){
      e.currentTarget.nextSibling.nextSibling.style.fontWeight = '800'  
    } else {
      e.currentTarget.nextSibling.nextSibling.style.fontWeight = '400'  
    }
  }
  render () {
    return (
      <div className='category ui secondary fluid three item'>
        <div className='onboarding'>
          {this.props.categoryContext.allCategories.map(category => {
            return (
              <div key={category._id} className='item'>
                <label className='container'>
                  <input
                    onChange={this.changeCheckLabel}
                    type='checkbox'
                    id={category._id} // for styling purposes
                    name={category._id}
                    checked={this.props.categoryContext.selectedCategoriesIds.includes(category._id) && true}
                  />
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
