import React from 'react'
import FeedPosts from '../components/Post/FeedPosts'

class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <FeedPosts />
      </div>
    )
  }
}

export default Home
