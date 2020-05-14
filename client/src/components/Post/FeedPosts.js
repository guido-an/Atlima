import React from 'react'
import PostContext  from '../../contexts/PostContext'

import DisplayPosts from './DisplayPosts'

class FeedPosts extends React.Component {
  static contextType = PostContext
    componentDidMount(){
      this.context.getFeedPosts()
   }
  render () {
    return (
        <DisplayPosts 
           posts={this.context.feedPosts} 
           likePost={this.context.likePost}
           commentPost={this.context.commentPost}
        />
    )
  }
}

export default FeedPosts

