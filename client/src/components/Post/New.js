import React from 'react'
import  { useHistory } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'

import CategoryContext  from '../../contexts/CategoryContext'

import SelectCategoriesPost from '../../components/Categories/SelectCategoriesPost'


class Post extends React.Component {
   static contextType = CategoryContext

  state = { 
      content: '',
      mediaArray: [],
      location: null
    }
  
  onSubmit = async e => {
    e.preventDefault();
      try {
        await this.props.postContext.createPost(
          this.state.content,
          this.state.mediaArray,
          this.state.location,
          this.context.selectedCategoriesIds
        )
      // this.props.history.push('/')
 
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
              <SelectCategoriesPost/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

