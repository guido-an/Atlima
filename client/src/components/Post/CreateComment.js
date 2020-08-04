import React from 'react'
import PostContext  from '../../contexts/PostContext'
import '../scss/Comments.scss'
import TimeAgo from '../TimeAgo'
import Discobolo  from '../../images/discobolo.jpg'

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
    await this.context.commentPost(this.state.post._id, this.state.content)
    const post = await this.context.getSinglePost(this.state.post._id)
    this.setState({post})
    this.commentInput.value = "";
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

  render () {
    console.log(this.state.post, this.props.postId)
    if(!this.state.post){
      return <p>loading</p>
    }
    return (
      <div className="comments">
        <p className="comments-number">Comments {this.state.post.comments.length}</p>
        <form className="comment-form" onSubmit={this.onSubmit}>
            <img className='ui avatar image circular' src={this.props.loggedInUser.profilePicture ? this.props.loggedInUser.profilePicture.url : Discobolo } />
            <input onChange={this.onInputChange} id="commentInput" ref={(ref) => this.commentInput= ref} type="text" placeholder="content" name="content"/>
        </form>
        <div className="spacer"></div>
        {this.state.post.comments && this.state.post.comments.map((comment, i )=> {
        return (
          <div key={i}>
             <TimeAgo date={Date.parse(comment.date)} />
            <img className='ui avatar image circular' src={comment.user.profilePicture ? comment.user.profilePicture.url : Discobolo } />
            <p>{comment.user.firstName} {comment.user.lastName}</p>
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

