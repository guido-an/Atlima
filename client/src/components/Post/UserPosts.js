import React from 'react'
import { GET_USER_POSTS } from '../../api/postAPI'
import AuthContext  from '../../contexts/AuthContext'

import PostCard from './PostCard'
import DisplayPosts from './DisplayPosts'


class UserPosts extends React.Component {
  static contextType = AuthContext

     state = { 
      posts: '',
    }
  
    componentDidMount() {
      this.getPosts()
    }


    getPosts = async userId => {
        try {
          userId = this.props.userId
            const userPosts = await GET_USER_POSTS(userId)
            this.setState({ posts: userPosts })
        }
        catch(err){
            console.log(err)
        }
    }

  render () {
    return (
      <div>
        <DisplayPosts />
      {this.state.posts && this.state.posts.map(post => {
           return (
            <PostCard key={post._id} post={post} />
           )
       })}
      </div>
    )
  }
}

export default UserPosts
