import '../scss/PostCard.scss'
import React from 'react'
import { Link } from 'react-router-dom'
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
import Follow from '../Post/follow'

class PostCard extends React.Component {
  static contextType = PostContext
  state = {
    post: null,
    isCopyDone: false,
  };
  
  async componentDidMount(){
    const post = await this.context.getSinglePost(this.props.postId)
    this.setState({post})
 }

  likePostAndUpdateIt = async postId => {
    postId = this.props.postId
    try {
      await this.context.likePost(postId)
       const postUpdated = await this.context.getSinglePost(postId)
       this.setState({ post: postUpdated })
    } catch(err){
      console.log(err, 'err')
    }
  }

  copyToClipboard = (e) => {
    e.preventDefault();
    this.setState({ isCopyDone: true });
    setTimeout(() => this.setState({ isCopyDone: false }), 300);
    const link = `localhost::3000/post/${this.state.post._id}`
    navigator.clipboard.writeText(link)
  };

  isInclude = likeUsers => {
      const isThere = likeUsers.includes(this.props.loggedInUser._id)
      return isThere
  }

  render () {
    if(!this.state.post){
      return <p></p>
    }
    return (
      <div className='post-card-container'>
        { !this.props.onePost && 
          <div className='post-card-header'>
            <div>
              <Link to={`/profile/${this.state.post.user._id}`}><img className='ui avatar image circular' src={this.state.post.user.profilePicture ? this.state.post.user.profilePicture.url : Discobolo } /></Link>
            </div>
            <div className='post-card-header-content'>
              <p><strong><Link to={`/profile/${this.state.post.user._id}`}>{this.state.post.user.firstName} {this.state.post.user.lastName}</Link></strong></p>

              <div className="spot-info">
                <span> <TimeAgo date={Date.parse(this.state.post.created_at)} /> </span>
                <span className="dot-location"></span>
                <span className="location-name"><RoomRoundedIcon /> {this.state.post.spot && this.state.post.spot.location ? this.state.post.spot.location.terms[0].value : "Its a mistery :o"}</span>
              </div> 
            </div>
          </div>
        }
        <div>
          <Carousel showArrows={false} showThumbs={false} showIndicators={this.state.post.mediaFile.length >= 2? true : false } showStatus={false} infiniteLoop={this.state.post.mediaFile.length >= 2? true : false } dynamicHeight={true} cancelable={false}>
            {this.state.post.mediaFile && this.state.post.mediaFile.map((media, i) => {
              if (media.type[0] == "v"){
              return (
                <div key={i + this.state.post._id}>
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
                  <div>
                    <Link to={`/post/${this.state.post._id}`}>
                      <img key={i + this.state.post._id} src={media.url} style={{ maxWidth: '100vw', left: '0px' }} />
                    </Link>
                  </div>
                )}
              else{
                
              }
            })}
          </Carousel>
        </div>
        {this.state.post.title ? <Link to={`/post/${this.state.post._id}`}><h4 className="title">{this.state.post.title}</h4></Link> : "" } 
        <div className='post-card-icons'>
          <div className={this.isInclude(this.state.post.likes ) ? "like" : "" } onClick={this.likePostAndUpdateIt}>
            <ThumbUpAltRoundedIcon />
            <br/>
            <p>{this.state.post.likes.length}</p>
          </div>
          <div className="coment">
            <Link to={`/post/${this.state.post._id}`}><ChatBubbleRoundedIcon /></Link>
            <p>{this.state.post.comments.length}</p>
          </div>
          <div className="share">
            <ReplyRoundedIcon onClick={this.copyToClipboard} className={this.state.isCopyDone === false ? "" : "light"} />
            <p className={this.state.isCopyDone === false ? "d-none" : ""}>Link Copied</p>
          </div>
        </div> 
        <div className="description">
          <ReadMoreReact 
            text={this.state.post.content}  
            min={70}
            ideal={75}
            max={85}
            readMoreText={"...READ MORE"}
            />
        </div>
        <div className="spacer"></div>
        { this.props.onePost && 
          <Follow post={this.state.post} loggedInUser={this.context.loggedInUser} />
        }
      </div>
    )
  }
}

export default PostCard
