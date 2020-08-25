import React from 'react'
import { Link } from 'react-router-dom';
import PostContext  from '../../contexts/PostContext'
import '../scss/Comments.scss'
import TimeAgo from '../TimeAgo'
import Spinner from '../../components/Spinner'
import ProfilePictureDefault from '../Profile/ProfilePictureDefault'
class CreateComment extends React.Component {
  static contextType = PostContext
  state = { 
      content: '',
      post: null
    }
    async componentDidMount(){
      const post = await this.context.getSinglePost(this.props.postId)
      this.setState({post})
   }

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.content != ""){
      await this.context.commentPost(this.state.post._id, this.state.content)
      const post = await this.context.getSinglePost(this.state.post._id)
      this.setState({post, content: ""})
      this.commentInput.value = "";
    }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

  render () {
    if(!this.state.post){
      return <Spinner/>
    }
    return (
      <div className="comments">
        <p className="comments-number">Comments {this.state.post.comments.length}</p>
        <form className="comment-form" onSubmit={this.onSubmit}>
            {/* <img className='ui avatar image circular' src={this.props.loggedInUser.profilePicture ? this.props.loggedInUser.profilePicture.url : Discobolo } /> */}
            <input onChange={this.onInputChange} id="commentInput" ref={(ref) => this.commentInput= ref} type="text" placeholder="Write a comment..." name="content"/>
        </form>
        <div className="spacer"></div>
        {this.state.post.comments && this.state.post.comments.map((comment, i )=> {
        return (
          <div key={i}>
             <TimeAgo date={Date.parse(comment.date)} />
            {comment.user.profilePicture ? <img className='ui avatar image circular' src={comment.user.profilePicture} />
             : 
             <ProfilePictureDefault 
                     user={this.state.post.user}
                     heightAndWidth="40px"
                     fontSize="16px"
                     bottom="-65px"
                     top="10px"
                  />
              }
            <p><Link to={`/profile/${comment.user._id}`}>{comment.user.firstName} {comment.user.lastName}</Link></p>
            <p className="coment-text">{comment.content}</p>
            <div className="spacer"></div>
          </div>
        )
      })}
      </div>
    )
  }
}

export default CreateComment

