import React from 'react'
import PostContext  from '../../contexts/PostContext'
import '../scss/Comments.scss'


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
        {this.state.post.comments && this.state.post.comments.map((comment, i )=> {
        return (
          <div key={i}>
            <p>{comment.user.firstName}</p>
            <p>{comment.content}</p>
          </div>
        )
      })}
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} id="commentInput" ref={(ref) => this.commentInput= ref} type="text" placeholder="content" name="content"/>
            <button>Create comment</button>
        </form>
      </div>
    )
  }
}

export default CreateComment

