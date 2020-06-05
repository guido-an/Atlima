import '../scss/PostCard.scss'
import React from 'react'
import ReactPlayer from 'react-player'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PostContext  from '../../contexts/PostContext'
import TimeAgo from '../../components/TimeAgo'

class PostCard extends React.Component {
  static contextType = PostContext
  
  state = { post: this.props.post}

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
    console.log(this.state.post)
    debugger
    return (
      <div className='post-card-container'>
        <div className='post-card-header'>
          <div>
            <img className='ui avatar image circular' src='https://picsum.photos/250' />
          </div>
          <div className='post-card-header-content'>
            <p><strong>{this.state.post.user.firstName} {this.state.post.user.lastName}</strong></p>
            <span> <TimeAgo date={Date.parse(this.state.post.created_at)} /> - {this.state.post.spot.location ? this.state.post.spot.location.terms[0].value : "s"}</span>

          </div>
        </div>
        <div>
          <Carousel showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={true} dynamicHeight={true} cancelable={false}>
            {this.state.post.mediaFile && this.state.post.mediaFile.map(media => {
              if (media.type[0] == "v"){
              return (
                <div>
                  <ReactPlayer
                  className='react-player'
                  playing={false}
                  loop={true}
                  controls={true}
                  playIcon=""
                  url= {media.url}
                  width='100%'
                  height='100%'
                />
              </div>
              )}
              else if(media.type[0] == "i" ){
                return (
                <img src={media.url} style={{ maxWidth: '100vw', left: '0px' }} />
                )}
              else{
                
              }
            })}
          </Carousel>
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
