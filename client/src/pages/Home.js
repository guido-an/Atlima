import React from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'
import SearchBar from '../components/SearchBar'
// import SearchIcon from '@material-ui/icons/Search';
import searchIcon from '../images/search-icon.png'
import logo from '../images/logo-atlima.png'


class Home extends React.Component {
  static contextType = PostContext
  state = {
        hideShowSearch: false,
        searchIconSize: '20',
        topMargin: '17',
        rightMargin: '5'
    }

  ShowSearchInput = () => {
    let searchIconSize
    let topMargin
    let rightMargin

    if(!this.state.hideShowSearch){
      // make icon smaller 
      searchIconSize = '14'
      topMargin = '22'
      rightMargin = '7'
     
    } else {
      searchIconSize = '20'
      topMargin = '17'
      rightMargin = '5'
    }


        this.setState({ 
          hideShowSearch: !this.state.hideShowSearch,
          searchIconSize,
          topMargin,
          rightMargin
         })  
     }


  render () {
    return (
      <div>
        <div className="feed-header">
          <div className="logo-wrapper">
            <img src={logo} id="logo-home" alt="altima-logo"/>
          </div>
          {this.state.hideShowSearch && <SearchBar/>}
              <img src={searchIcon} 
                style={{ 
                  width: this.state.searchIconSize + 'px !important',
                  height: this.state.searchIconSize + 'px',
                  position: 'absolute',
                  right: this.state.rightMargin + 'vw',
                  top: this.state.topMargin + 'px',
                  color: '#bfbfbf'
                  }} 
              onClick={this.ShowSearchInput}/>
         </div>
           <FilterByCategories postContext={this.context} user={this.props.user}/>
           <FeedPosts />
      </div>
    )
  }
}

export default Home
