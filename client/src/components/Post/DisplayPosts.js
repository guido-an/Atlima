import React from 'react'
import PostCard from './PostCard'
import CreateComment from './CreateComment'

const DisplayPosts = ({ posts, likePost, commentPost }) => {
  return <div>
    {posts && posts.map(post => {
      return (
        <div key={post._id}>
          <PostCard post={post} likePost={likePost} />
          <CreateComment postId={post._id} commentPost={commentPost} />
        </div>
      )
    })}
  </div>
}

export default DisplayPosts
