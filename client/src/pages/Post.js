import React from 'react'
import PostContext from '../contexts/PostContext'

import PostCard from '../components/Post/PostCard'

class Post extends React.Component {
 static contextType = PostContext
 state = { 
   post : null
  }

 async componentDidMount(){
    const post = await this.context.getSinglePost(this.props.match.params.id)
    this.setState({post})
 }


  render () {
      console.log(this.state.post, 'post')
    return (
      <div>
        <PostCard post={this.state.post} />
        
      </div>
    )
  }
}

export default Post