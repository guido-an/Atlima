import '../scss/PostCard.scss'
import React from 'react'

class PostCard extends React.Component {
  render () {
    const { post } = this.props
    console.log(post, 'poscard')

    return (
      <div className='post-card-container'>
        <div className='post-card-header'>
          <div>
            <img className='ui avatar image circular' src='https://picsum.photos/250' />
          </div>
          <div className='post-card-header-content'>
            <p><strong>{post.user.firstName}</strong></p>
            <span>Amsterdam</span>
          </div>
        </div>

        <div>
          <img src='https://picsum.photos/400' style={{ maxWidth: '100vw', left: '0px' }} />
        </div>

        <div className='post-card-icons'>
          <div onClick={() => this.props.likePost(post._id)}>
            <i className='heart icon outline' />
          </div>
          <div>
            <i className='comment outline icon' />
          </div>
        </div>

        <div className='post-card-bottom'>
          <div>
            <p><strong>{post.likes.length} likes</strong></p>
            <p><strong>{post.user.firstName}</strong><span> {post.content}</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCard
