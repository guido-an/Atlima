import React from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'

class Home extends React.Component {
  static contextType = PostContext
  render () {
    return (
      <div>
        <div className="feed-header">
          <h1 >altima</h1>
          <SearchRoundedIcon />
        </div>
        <FilterByCategories postContext={this.context} />
        <FeedPosts />
      </div>
    )
  }
}

export default Home
