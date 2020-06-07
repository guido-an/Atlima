import React from 'react'
import CategoryContext from '../../contexts/CategoryContext'

class FilterByCategories extends React.Component {
   static contextType = CategoryContext

  componentDidMount () {
    this.context.cleanSelectedCategoriesIds()
    this.context.getCategories()
  }

  onFilterCategoryChange = async e => {
    await this.context.onSelectCategories(e)
    this.props.postContext.filterPostsOnCategoryHome()
  }

  render () {
    return (
      <div>
        {this.context.allCategories.map(category => {
          return (
            <div key={category._id}>
              <span>{category.name}</span>
              <input onChange={this.onFilterCategoryChange} type='checkbox' name={category._id} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default FilterByCategories
