import React from 'react'
import { GET_USER_POSTS } from '../../api/postAPI'

class UserPosts extends React.Component {
     state = { 
      posts: '',
    }
  
    componentDidMount() {
      this.getPosts()
    }

    getPosts = async userId => {
        userId = this.props.match.params.id
        try {
            const userPosts = await GET_USER_POSTS(userId)
            this.setState({ posts: userPosts })
        }
        catch(err){
            console.log(err)
        }
    }

  render () {
    const displayUserPosts = this.state.posts && this.state.posts.map(post => {
        return (
            <div key={post._id}>
              <p>{post.content}</p>
            </div>
        )
    })
    return (
      <div>
          <h2>User posts</h2>
          {displayUserPosts}
      </div>
    )
  }
}

export default UserPosts
