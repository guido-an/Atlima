import React from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
// import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'
import SearchBar from '../components/SearchBar'



class Home extends React.Component {

  getSearchTerm = async term => {
    try {
      console.log(term)
      // const res = await github.get(`/api/search/repositories?q=${term}`)
      
      // this.getApiTimeResponse()
    
      // this.setState({ repos: res.data.repositories, reposCopy: res.data.repositories })  
      
    } catch(err) {
      console.log(err)
    }
  }

  static contextType = PostContext
  render () {
    return (
      <div>
        <div className="feed-header">
          <h1 >altima</h1>
          <SearchBar getSearchTerm={this.getSearchTerm}/>
          {/* <SearchRoundedIcon /> */}
        </div>
        <FilterByCategories postContext={this.context} user={this.props.user}/>
        <FeedPosts />
      </div>
    )
  }
}

export default Home
