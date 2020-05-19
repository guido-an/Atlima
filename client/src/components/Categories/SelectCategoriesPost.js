import React from 'react'
import CategoryContext from '../../contexts/CategoryContext'


class SelectCategoriesPost extends React.Component {
  static contextType = CategoryContext

  componentDidMount(){
    this.context.getCategories()
  }

  render () {
    return (
      <div>
      {this.context.allCategories.map(category => {
                 return (
                   <div key={category._id}>
                   <span>{category.name}</span>
                   <input onChange={this.context.onSelectUserCategories} type="checkbox" name={category._id}/>
            </div>
            )
        })}
      </div>
    )
  }
}

export default SelectCategoriesPost
