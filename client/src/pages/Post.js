import React from 'react'
import AuthContext from '../contexts/AuthContext'

import PostCard from '../components/Post/PostCard'
import CreateComment from '../components/Post/CreateComment'

class Post extends React.Component {
 static contextType = AuthContext
 state = { 
   post : null
  }

  render () {
    return (
      <div>
        <PostCard postId={this.props.match.params.id} loggedInUser={this.context.loggedInUser} onePost="0"/>
        <CreateComment postId={this.props.match.params.id} loggedInUser={this.context.loggedInUser} />
      </div>
    )
  }
}

export default Post