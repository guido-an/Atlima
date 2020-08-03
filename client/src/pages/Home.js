// import React from 'react'
// import PostContext from '../contexts/PostContext'
// import '../components/scss/feedFilter.scss'
// import FeedPosts from '../components/Post/FeedPosts'
// import FilterByCategories from '../components/Categories/FilterByCategories'
// import SearchBar from '../components/SearchBar'
// import {  SEARCH_FOR_USERS } from '../api/userAPI'



// class Home extends React.Component {

//   state = { usersSearched: null }

//   getSearchTerm = async term => {
//     try {
//       console.log(term)
//       const users = await SEARCH_FOR_USERS(term)
//       console.log(users, 'users')
//       this.setState({ usersSearched: users })    
//     } catch(err) {
//       console.log(err)
//     }
//   }

//   static contextType = PostContext
//   render () {
//     return (
//       <div>
//         <div className="feed-header">
//           <h1 >altima</h1>
//           <SearchBar getSearchTerm={this.getSearchTerm} usersSearched={this.state.usersSearched}/>
          
//         </div>
//         <FilterByCategories postContext={this.context} user={this.props.user}/>
//         <FeedPosts />
//       </div>
//     )
//   }
// }

// export default Home
import React from 'react'
import PostContext from '../contexts/PostContext'
import '../components/scss/feedFilter.scss'
import FeedPosts from '../components/Post/FeedPosts'
import FilterByCategories from '../components/Categories/FilterByCategories'
import SearchBar from '../components/SearchBar'



class Home extends React.Component {
  static contextType = PostContext

  render () {
    return (
      <div>
        <div className="feed-header">
          <h1 >altima</h1>
          <SearchBar />
          
        </div>
        <FilterByCategories postContext={this.context} user={this.props.user}/>
        <FeedPosts />
      </div>
    )
  }
}

export default Home
