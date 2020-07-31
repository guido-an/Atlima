import React from 'react'
import CategoryContext from '../../contexts/CategoryContext'


class SelectCategoriesPost extends React.Component {
  static contextType = CategoryContext

  componentDidMount(){
    this.context.getCategories()
  }
  render () {
    return (
      <div className="categories-on-create">
        <div className="wrapper-categories">
         {this.context.allCategories.map((category, i) => {
            return (
              <div key={i} className='item'>
                <label className='container '>
                  <input onChange={this.context.onSelectCategories} type='checkbox' name={category._id} />
                  <span className="checkmark">{category.name}</span>
                 </label>
              </div>
            )
          })}
          </div>
        </div>
    )
  }
}

export default SelectCategoriesPost
