import React from 'react'
import AuthContext  from '../../contexts/AuthContext'
import PostCard from './PostCard'

class DisplayPosts extends React.Component {
  static contextType = AuthContext
  render(){
    return <div>
    {this.props.posts && this.props.posts.map(post => {
      return (
        <div key={post._id}>
          <PostCard postId={post._id} likePost={this.props.likePost} loggedInUser={this.context.loggedInUser}/>
        </div>
      )
    })}
  </div>
  }
}

export default DisplayPosts
