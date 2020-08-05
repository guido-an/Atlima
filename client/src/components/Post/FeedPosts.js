import React from 'react'
import PostContext  from '../../contexts/PostContext'

import DisplayPosts from './DisplayPosts'

class FeedPosts extends React.Component {
  static contextType = PostContext
    async componentDidMount(){
      await this.context.getFeedPosts()
   }
  render () {
    return (
        <DisplayPosts 
           posts={this.context.feedPosts} 
           commentPost={this.context.commentPost}
        />
    )
  }
}

export default FeedPosts

