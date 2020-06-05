import React from 'react'
import PostCard from './PostCard'

const DisplayPosts = ({ posts, likePost, commentPost }) => {
  return <div>
    {posts && posts.map(post => {
      return (
        <div key={post._id}>
          <PostCard post={post} likePost={likePost}/>
        </div>
      )
    })}
  </div>
}

export default DisplayPosts
