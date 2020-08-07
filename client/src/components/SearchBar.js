import '../components/scss/navbar.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import {  SEARCH_FOR_USERS } from '../api/userAPI'
import SearchIcon from '@material-ui/icons/Search';




class SearchBar extends React.Component {

    state = {
        term: '',
        dropDownActive: false,
        usersSearched: [],
    }

    getSearchedUsers = async term => {
        try {
          const users = await SEARCH_FOR_USERS(this.state.term)
          this.setState({ usersSearched: users })    
        } catch(err) {
          console.log(err)
        }
    }

    onInputChange = async e => {
        this.setState({ term: e.target.value, dropDownActive: true })
        await this.getSearchedUsers()
    }
  render () {   
    return (
      <div className="search">
          <div className="dropdown" >
              <input type='text' onChange={this.onInputChange} placeholder='Search friends...' />
              <div className={this.state.dropDownActive ? "dropdown-content" : undefined}>
                  {this.state.usersSearched.length >= 1 ? 
                      this.state.usersSearched.map(user => {
                        return <div key={user._id} className="user">
                            <Link to={`/profile/${user._id}`}>
                              <p>{user.firstName} {user.lastName}</p>
                            </Link>
                        </div>
                    }) : 
                    this.state.dropDownActive && <p>No users found</p>
                  }
              </div>
          </div>
      </div>
    )
  }
}

export default SearchBar
