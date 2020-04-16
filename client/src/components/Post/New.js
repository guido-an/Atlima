import React from 'react'
import AuthContext  from '../../contexts/AuthContext'
import { CREATE_POST } from '../../api/postAPI'
import ImageUpload from './ImageUpload'

class Post extends React.Component {
  static contextType = AuthContext

  state = { 
      content: '',
      media: ''
    }
  
  onSubmit = async e => {
    e.preventDefault();
    this.getMediaUrl()
      try {
      await CREATE_POST(
        this.state.content,
        this.context.loggedInUser._id,
        this.state.media
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

    getMediaUrl = url => {

      this.setState({ media: url })

    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaUrl={this.getMediaUrl}/>
      </div>
    )
  }
}

export default Post
