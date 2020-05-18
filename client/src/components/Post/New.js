import React from 'react'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'
// import { CREATE_POST } from '../../api/postAPI'

import { GET_CATEGORIES } from '../../api/categoryAPI'

import PostContext  from '../../contexts/PostContext'


class Post extends React.Component {
  static contextType = PostContext

  state = { 
      content: '',
      mediaArray: [],
      location: null,
      categories: [],
      selectedCategoriesIds: []
    }

    getCategories= async () => {
      try{
        const categoriesFromDb = await GET_CATEGORIES()
        this.setState({ categories: categoriesFromDb })
      } catch(err) {
        console.log(err)
      }
    }

    onSelect = e => {
      const { name } = e.target;
      if(e.target.checked){
        this.setState({
          selectedCategoriesIds: [...this.state.selectedCategoriesIds, name],
        })
      } else {
        this.removeCategory(name)
      }
    }
    
    removeCategory = (name) => {
      let myArray = [...this.state.selectedCategoriesIds]
        if(myArray.includes(name)){
          const newArray = myArray.filter(category => {
            return category !== name
          })
          this.setState({ selectedCategoriesIds: newArray })
        }
      }

    componentDidMount(){
      this.getCategories()
    }
  
  onSubmit = async e => {
    e.preventDefault();
      try {
        await this.context.createPost(
          this.state.content,
          this.state.mediaArray,
          this.state.location,
          this.state.selectedCategoriesIds
        )
       

      this.props.history.push('/')
    }  catch(err){
          console.log(err)
     }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }


    getMediaArray = url => {
      this.setState({ mediaArray: [...this.state.mediaArray, url]})
    }

    getLocation = spotLocation => {
      this.setState({location: spotLocation})
    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <Places getLocation={this.getLocation} />
            {this.state.categories.map(category => {
                 return (
                   <div key={category._id}>
                   <span>{category.name}</span>
                   <input onChange={this.onSelect} type="checkbox" name={category._id}/>
                 </div>
                 )
               })}
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

