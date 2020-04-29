import React from 'react'
import { GET_POSTS, LIKE_A_POST } from '../../api/postAPI'

import PostCard from './PostCard'

class AllPosts extends React.Component {
  state = { 
      posts: '',
    }

  async componentDidMount(){
      this.getPosts()
   }

  getPosts = async () => {
    try {
        const allPosts = await GET_POSTS()
        this.setState({ posts: allPosts })
       } 
        catch(err){
          console.log(err)
      }
   }

   likePost = async postId => {
    try {
        await LIKE_A_POST(postId)
        this.getPosts()
    } catch(err){
        console.log(err)
    }
   }

//   deletePost = async postId => {
//     await  DELETE_POST(postId)
//     this.getPosts()
//  }

  render () {
    return (
      <div>   
       {this.state.posts && this.state.posts.map(post => {
           return (
            <PostCard key={post._id} post={post} likePost={this.likePost} />
           )
       })}
      </div>
    )
  }
}


export default AllPosts
