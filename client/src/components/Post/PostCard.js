import '../scss/PostCard.scss'
import React from 'react'
import { LIKE_A_POST } from '../../api/postAPI'
 
class PostCard extends React.Component {

 clickOnLike = async postId => {
  try {
      await LIKE_A_POST(postId)
      console.log('post like from component')
  }
  catch(err){
      console.log(err)
  }
 }

  render () {
    const { post } = this.props
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
          <div>
            <i  className='heart outline icon' />
          </div>
          <div>
            <i className='comment outline icon' />
          </div>
        </div>

        <div className='post-card-bottom'>
          <div>
            <p><strong>{post.likes} likes</strong></p>
            <p><strong>{post.user.firstName}</strong><span> {post.content}</span></p>
          </div>
        </div>

      </div>
    )
  }
}

export default PostCard
