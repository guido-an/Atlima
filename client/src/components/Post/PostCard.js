import '../scss/PostCard.scss'
import React from 'react'

import PostContext  from '../../contexts/PostContext'

class PostCard extends React.Component {
  static contextType = PostContext
  
  state = { post: this.props.post }

  likePostAndUpdateIt = async postId => {
    postId = this.state.post._id
   
    try {
      await this.props.likePost(postId)
      const postUpdated = await this.context.getSinglePost(postId)
      this.setState({ post: postUpdated })
    } catch(err){
      console.log(err, 'err')
    }
  }

  render () {
    return (
      <div className='post-card-container'>
        <div className='post-card-header'>
          <div>
            <img className='ui avatar image circular' src='https://picsum.photos/250' />
          </div>
          <div className='post-card-header-content'>
            <p><strong>{this.state.post.user.firstName}</strong></p>
            <span>{(this.state.post.spot && this.state.post.spot.location) && this.state.post.spot.location.description}</span>
          </div>
        </div>

        <div>
          <img src='https://picsum.photos/400' style={{ maxWidth: '100vw', left: '0px' }} />
        </div>

        <div className='post-card-icons'>
          <div onClick={this.likePostAndUpdateIt}>
            <i className='heart icon outline' />
          </div>
          
          <div>
            <i className='comment outline icon' />
          </div>
        </div>

        <div className='post-card-bottom'>
          <div>
            <p><strong>{this.state.post.likes.length} likes</strong></p>
            <p><strong>{this.state.post.user.firstName}</strong><span> {this.state.post.content}</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCard
