import React from 'react'
import PostContext  from '../../contexts/PostContext'

import PostCard from './PostCard'
import DisplayPosts from './DisplayPosts'


class UserPosts extends React.Component {
  static contextType = PostContext
  
    componentDidMount() {
      const { userId } = this.props
      this.context.getUserPosts(userId)
    }

  render () {
    return (
      <div>
         <DisplayPosts 
             posts={this.context.userPosts} 
             likePost={this.context.likePost}
             commentPost={this.context.commentPost}
          />
      </div> 
    )
  }
}

export default UserPosts
