import React from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'
import SearchBar from '../components/SearchBar'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../images/altima-logo.png'


class Home extends React.Component {
  static contextType = PostContext
  state = {
        hideShowSearch: false,
    }

  ShowSearchInput = () => {
        this.setState({ hideShowSearch: !this.state.hideShowSearch })          
    }

  render () {
    return (
      <div>
        <div className="feed-header">
          <div className="logo-wrapper">
            <img src={logo} alt="altima-logo"/>
          </div>
          {this.state.hideShowSearch && <SearchBar/>}
          <SearchIcon onClick={this.ShowSearchInput}/>
        </div>
        <FilterByCategories postContext={this.context} user={this.props.user}/>
        <FeedPosts />
      </div>
    )
  }
}

export default Home
