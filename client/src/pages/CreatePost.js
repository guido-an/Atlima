import React from 'react'
import PostContext from '../contexts/PostContext'

import New from '../components/Post/New'
import SectionIntroduction from '../components/SectionIntroduction'

class CreatePost extends React.Component {
 static contextType = PostContext

  render () {
    return (
      <div className="create-post-container">
        <SectionIntroduction title='Adding new post'/>
        <New postContext={this.context} />
      </div>
    )
  }
}

export default CreatePost
