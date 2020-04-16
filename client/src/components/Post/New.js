import React from 'react'
import AuthContext  from '../../contexts/AuthContext'
import { CREATE_POST } from '../../api/postAPI'
import ImageUpload from './ImageUpload'

class Post extends React.Component {
  static contextType = AuthContext

  state = { 
      content: '',
      mediaArray: []
    }
  
  onSubmit = async e => {
    e.preventDefault();
    
      try {
      await CREATE_POST(
        this.state.content,
        this.context.loggedInUser._id,
        this.state.mediaArray
      )
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
      console.log(this.state.mediaArray, 'url from array ')
    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

