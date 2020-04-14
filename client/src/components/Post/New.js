import React from 'react'
import axios from 'axios'
import AuthContext  from '../../contexts/AuthContext'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

class Post extends React.Component {
  static contextType = AuthContext

  state = { 
      content: '',
    }
  
    onSubmit = async e => {
        e.preventDefault();
        try {
            await service.post(`${process.env.REACT_APP_API_URL}/post/new`, {
              content: this.state.content,
              _id: this.context.loggedInUser._id
            }
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

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            {/* {this.context.loggedInUser &&
            <input name="_id" value={this.state._id}/>} */}
            <button>Create post</button>
        </form>
        {this.context.loggedInUser && this.context.loggedInUser._id}
      </div>
    )
  }
}


export default Post
