import React from 'react'
import PostContext from '../contexts/PostContext'

import New from '../components/Post/New'

class CreatePost extends React.Component {
 static contextType = PostContext

  render () {
    return (
      <div>
        <h1>new post page</h1>
        <New postContext={this.context} />
      </div>
    )
  }
}

export default CreatePost
