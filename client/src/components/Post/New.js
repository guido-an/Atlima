import React from 'react'
import { CREATE_POST } from '../../api/postAPI'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'

class Post extends React.Component {
  
  state = { 
      content: '',
      mediaArray: [],
      location: null
    }
  
  onSubmit = async e => {
    e.preventDefault();
    
      try {
      await CREATE_POST(
        this.state.content,
        this.state.mediaArray,
        this.state.location
       
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
    console.log(this.state.location)
    return (
      <div>
  
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <Places getLocation={this.getLocation}/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

