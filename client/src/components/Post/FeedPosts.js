import React from 'react'
import { GET_POSTS, LIKE_A_POST, COMMENT_A_POST } from '../../api/postAPI'

import DisplayPosts from './DisplayPosts'

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

   commentPost = async (postId, content) => {
    try {
        await COMMENT_A_POST(postId, content)
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
        <DisplayPosts 
           posts={this.state.posts} 
           likePost={this.likePost}
           commentPost={this.commentPost}
        />
      </div>
    )
  }
}


export default AllPosts
