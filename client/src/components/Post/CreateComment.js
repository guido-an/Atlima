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
      post: null,
      inputValue: '',
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
      this.setState({post, content: "", inputValue: "",})
      this.commentInput.value = "";
    }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
          inputValue: value,
        });
    }

  render () {
    console.log(this.state.inputValue , 'imput')
    if(!this.state.post){
      return <Spinner/>
    }
    return (
      <div className="comments">
        <p className="comments-number">Comments {this.state.post.comments.length}</p>
        <form className="comment-form" onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} id="commentInput" ref={(ref) => this.commentInput= ref} type="text" placeholder="Write a comment..." name="content"/>
            <button className={this.state.inputValue === "" ? 'comment-btn inactive' : 'comment-btn active'}>Send</button>
        </form>
        <div className="spacer"></div>
        {this.state.post.comments && this.state.post.comments.map((comment, i )=> {
        return (
          <div key={i}>
            {comment.user.profilePicture ? 
            <div>
              <img className='ui avatar image circular' src={comment.user.profilePicture.url} />
            </div>
             : 
             <ProfilePictureDefault 
                     user={comment.user}
                     heightAndWidth="40px"
                     fontSize="16px"
                     bottom="-65px"
                     top="10px"
                  />
              }
            <p><Link to={`/profile/${comment.user._id}`}>{comment.user.firstName} {comment.user.lastName}</Link></p>
            <p className="coment-text">{comment.content}</p>
            <TimeAgo date={Date.parse(comment.date)} />
            <div className="spacer"></div>
          </div>
        )
      })}
      </div>
    )
  }
}

export default CreateComment

