import '../scss/CategoriesOnMap.scss'
import React from 'react'
import AuthContext from '../../contexts/AuthContext'

class CategoriesOnMap extends React.Component {
    static contextType = AuthContext

    state = { categoriesLikedByUser: [] }

    async componentDidMount () {
      this.props.categoryContext.cleanSelectedCategoriesIds()
      await this.props.categoryContext.getCategories()
      this.findCategoriesLikedByUser()
    }

    onFilterCategoryChange = async e => {
      const categoryId = e.target.name
      await this.props.categoryContext.onSelectCategories(e)
      this.props.postContext.filterMarkersOnMap()
     
      if(this.props.activeMarker){
        this.props.getLocation(this.props.activeMarker)
      }
    }

    
  findCategoriesLikedByUser = () => {
    let categoriesLikedByUser = []
    this.props.categoryContext.allCategories.forEach(category => {
         if(category.usersFollowing.includes(this.context.loggedInUser._id)){
          categoriesLikedByUser = [...categoriesLikedByUser, category]
         }
    })
    this.setState({ categoriesLikedByUser })
  }

  render () {
    console.log(this.props.categoryContext.allCategories, 'this.props.categoryContext.allCategories')
    return (
      <div className='categories-on-map'>
        <div className="wrapper-categories">
      {this.state.categoriesLikedByUser.map((category, i) => {
            return (
              <div key={i} className='item'>
                <label className='container '>
                  <input onChange={this.onFilterCategoryChange} type='checkbox' name={category._id} />
                  <span className="checkmark">{category.name}</span>
                 </label>
              </div>
            )
          })}
          </div>
          <div className="all-categories">
           <span>.</span>
           <span>.</span>
           <span>.</span>
          </div>
      </div>
    )
  }
}

export default CategoriesOnMap
