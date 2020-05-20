import React from 'react'
import PostContext from '../contexts/PostContext'

import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'

class Home extends React.Component {
  static contextType = PostContext
  render () {
    return (
      <div>
        <h1>Home</h1>
        <FilterByCategories postContext={this.context} />
        <FeedPosts />
      </div>
    )
  }
}

export default Home
