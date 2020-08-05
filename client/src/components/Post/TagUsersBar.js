import '../scss/TagUsersBar.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import {  SEARCH_FOR_USERS } from '../../api/userAPI'
import addIcon from '../../images/add-icon.png'


class TagUsersBar extends React.Component {

    state = {
        term: '',
        dropDownActive: false,
        searchedUsers: [],
        athletesToTag: [],
        newArrayEmail: []
    }

    getSearchedUsers = async term => {
        if(this.state.term.length === 0){
        }
        try {
          const users = await SEARCH_FOR_USERS(this.state.term)
          this.setState({ searchedUsers: users })    
        } catch(err) {
          console.log(err)
        }
      }

    onInputChange = async e => {
        this.setState({ term: e.target.value, dropDownActive: true })
        await this.getSearchedUsers()
    }

    tagAthlete = (user) => {
        // Extra step needed, user was not the same when added the second time
        if(!this.state.newArrayEmail.includes(user.email)) {
                this.setState({ 
                    athletesToTag: [...this.state.athletesToTag, user],
                    newArrayEmail: [...this.state.newArrayEmail, user.email]              
                    }, () => {
                        this.props.getAthletesToTag(this.state.athletesToTag)
                    })
            }
    }

    removeAthlete = user => {
        const updatedArray = this.state.athletesToTag.filter(athlete => {
            return athlete !== user
        })
        const arrayWithoutUserEmail = this.state.newArrayEmail.filter(athlete => {
            return athlete !== user.email
        })
        this.setState({ 
            athletesToTag: updatedArray, 
            newArrayEmail: arrayWithoutUserEmail
          }, () => {
            this.props.getAthletesToTag(this.state.athletesToTag)
          }) 
     }

  render () {     
    return (
        <section className="tag-users-bar">
        <div className="dropdown">
            <input type='text' onChange={this.onInputChange} placeholder='Search users' />
            <div className={this.state.dropDownActive ? "dropdown-content" : undefined}>
                {this.state.searchedUsers.length >= 1 ? 
                     this.state.searchedUsers.map(user => {
                      return <div key={user._id} className="user"> 
                            <p>{user.firstName} {user.lastName}</p> 
                            <img src={addIcon} onClick={() => this.tagAthlete(user)}/>
                      </div>
                  }) : 
                  this.state.dropDownActive && <p>No users found</p>
                 }
            </div>
          </div>
             <div className="athletes-to-tag">
                {this.state.athletesToTag.length >= 1 && 
                    <p><strong>Athletes added to the post:</strong></p>
                }
               {this.state.athletesToTag.map((athlete, i) => {
                     return <div key={i} className="athletes-added">
                       <span>{athlete.firstName}</span>
                       <span onClick={() => this.removeAthlete(athlete)} className="remove-athlete">X</span>
                     </div>
                 })}
            </div>
    </section>
    
    )
  }
}

export default TagUsersBar
