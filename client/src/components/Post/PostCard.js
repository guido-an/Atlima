import '../scss/PostCard.scss'
import React from 'react'
import ReactPlayer from 'react-player'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PostContext  from '../../contexts/PostContext'
import TimeAgo from '../../components/TimeAgo'
import Discobolo  from '../../images/discobolo.jpg'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import ReadMoreReact from 'read-more-react';

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

  isInclude = likeUsers => {
      const isThere = likeUsers.includes(this.props.loggedInUser._id)
      return isThere
  }

  render () {
    return (
      <div className='post-card-container'>
        <div className='post-card-header'>
          <div>
            <img className='ui avatar image circular' src={this.state.post.user.mediaFile.url ? this.state.post.user.mediaFile.url : Discobolo } />
          </div>
          <div className='post-card-header-content'>
            <p><strong>{this.state.post.user.firstName} {this.state.post.user.lastName}</strong></p>
            <div className="spot-info">
              <span> <TimeAgo date={Date.parse(this.state.post.created_at)} /> </span>
               <span className="dot-location"></span>
               <span className="location-name"><RoomRoundedIcon /> {this.state.post.spot && this.state.post.spot.location.terms ? this.state.post.spot.location.terms[0].value : "Its a mistery :o"}</span>
            </div> 
          </div>
        </div>
        <div>
          <Carousel showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={this.state.post.mediaFile.length >= 2? true : false } dynamicHeight={true} cancelable={false}>
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
          <div className={this.isInclude(this.state.post.likes)? "like" : "" } onClick={this.likePostAndUpdateIt}>
            <ThumbUpAltRoundedIcon />
            <br/>
            <p>{this.state.post.likes.length}</p>
          </div>
          <div className="coment">
            <ChatBubbleRoundedIcon />
            <p>{this.state.post.comments.length}</p>
          </div>
          <div className="share">
            <ReplyRoundedIcon />
          </div>
        </div> 
        <p className="description">
          <ReadMoreReact 
            text={this.state.post.content}  
            min={70}
            ideal={75}
            max={85}
            readMoreText={"...READ MORE"}
            /></p>
        <div className="spacer"></div>
      </div>
    )
  }
}

export default PostCard
