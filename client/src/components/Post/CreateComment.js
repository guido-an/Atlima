import React from 'react'


class CreateComment extends React.Component {
 
  state = { 
      content: '',
    }
  
  onSubmit = async e => {
    e.preventDefault();
    this.props.commentPost(this.props.postId, this.state.content)
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <button>Create comment</button>
        </form>
      </div>
    )
  }
}

export default CreateComment

