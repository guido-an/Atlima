import React from 'react'

class CategoriesOnBoarding extends React.Component {
  componentDidMount () {
    this.props.categoryContext.getCategories()
  }

  render () {
    return (
      <div>
        {this.props.categoryContext.allCategories.map(category => {
          return (
            <div key={category._id}>
              <span>{category.name}</span>
              <input onChange={this.props.categoryContext.onSelectUserCategories} type='checkbox' name={category._id} />
            </div>
          )
        })}
        <form onSubmit={this.props.categoryContext.onSubmitUserCategories}>
          <button>Next</button>
        </form>
      </div>
    )
  }
}

export default CategoriesOnBoarding
