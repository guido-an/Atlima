import React, { Suspense } from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
import FilterByCategories from '../components/Categories/FilterByCategories'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
// import SearchIcon from '@material-ui/icons/Search';
import searchIcon from '../images/search-icon.png'
import logo from '../images/logo-atlima.png'
const FeedPosts = React.lazy(() => import('../components/Post/FeedPosts'));






class Home extends React.Component {
  static contextType = PostContext
  state = {
        hideShowSearch: false,
        searchIconSize: '20',
        topMargin: '7',
        rightMargin: '1'
    }

  ShowSearchInput = () => {
    let searchIconSize
    let topMargin
    let rightMargin

    if(!this.state.hideShowSearch){
      // make icon smaller 
      searchIconSize = '14'
      topMargin = '8'
      rightMargin = '5'
     
    } else {
      searchIconSize = '20'
      topMargin = '5'
      rightMargin = '2'
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
            <img src={logo} id="logo-home" alt="atlima-logo"/>
          </div>
          {this.state.hideShowSearch && <SearchBar/>}
              <img src={searchIcon} 
                style={{ 
                  width: this.state.searchIconSize + 'px !important',
                  height: this.state.searchIconSize + 'px',
                  position: 'relative',
                  right: this.state.rightMargin + 'vw',
                  marginTop: this.state.topMargin + 'px',

                  color: '#bfbfbf'
                  }} 
              onClick={this.ShowSearchInput}/>
         </div>
           <FilterByCategories postContext={this.context} user={this.props.user}/>
           <Suspense fallback={<Spinner/>}>
             <FeedPosts />
           </Suspense>
      </div>
    )
  }
}

export default Home
