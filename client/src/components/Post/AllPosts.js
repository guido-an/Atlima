import React from 'react'
import { GET_POSTS, DELETE_POST } from '../../api/postAPI'
import axios from 'axios'


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

  deletePost = async postId => {
    await  DELETE_POST(postId)
    this.getPosts()
 }


  render () {
    return (
      <div>
          <h2>All posts</h2>
       {this.state.posts && this.state.posts.map(post => {
           return (
               <div key={post._id}>
                 <p>{post.content}</p>
                 <button onClick={() => this.deletePost(post._id)}>Delete post</button>
               </div>
           )
       })}
      </div>
    )
  }
}


export default AllPosts
