import '../scss/feedFilter.scss'
import React from 'react'
import CategoryContext from '../../contexts/CategoryContext'

class FilterByCategories extends React.Component {
   static contextType = CategoryContext

  componentDidMount () {
    this.context.cleanSelectedCategoriesIds()
    this.context.getCategories()
  }

  onFilterCategoryChange = async e => {
    if(this.context.myFeedActive) {
      this.context.cleanSelectedCategoriesIds()
    }
    await this.context.onSelectCategories(e)
    this.props.postContext.filterPostsOnCategoryHome()

  }

  onMyFeed = async  e => {
    if(this.context.myFeedActive) {
      this.context.cleanSelectedCategoriesIds()
    }else{
     await this.context.onMyFeedCategories(this.props.user.categories)
     this.props.postContext.filterPostsOnCategoryHome() 
    }
  }



  render () {
    return (
      <div className='feed-cat'>
        <div className='onboarding'>
          <div className="item">
            <button onClick={this.onMyFeed} className={this.context.myFeedActive ? "myFeedActive" : ""} >Feed</button>
          </div>
        {this.context.allCategories.map(category => {
          return (
              <div key={category._id} className='item'>
                <label className='container'>
                <input className="checkbox" onChange={this.onFilterCategoryChange} type='checkbox' name={category._id} checked={this.context.selectedCategoriesIds.includes(category._id) && true} />
                <span className={`checkmark  ${category.name}`}>{category.name}</span>
                </label>
              </div>
          )
        })}
      </div>
      </div>
    )
  }
}

export default FilterByCategories
