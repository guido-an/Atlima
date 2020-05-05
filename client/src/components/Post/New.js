import React from 'react'
import { CREATE_POST } from '../../api/postAPI'
import ImageUpload from './ImageUpload'

class Post extends React.Component {
  
  state = { 
      content: '',
      mediaArray: []
    }
  
  onSubmit = async e => {
    e.preventDefault();
    
      try {
      await CREATE_POST(
        this.state.content,
        this.state.mediaArray
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

