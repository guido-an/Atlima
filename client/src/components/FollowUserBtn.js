import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { FOLLOW_USER , GET_USER } from '../api/userAPI'

class FollowUserBtn extends React.Component {
 static contextType = AuthContext

 state = { 
   loggedInUser: null,
   userToDisplay: null,
   userToDisplayIsFollowed: null,
  }

  async componentDidMount(){
    try {
        await this.getUser()
      } catch(err){
        console.log(err)
      }
  }
  checkIfuserToDisplayIsFollowed = (userToDisplay) => {
      const followedByIds = userToDisplay.followedBy.map(user => user._id)
      if(followedByIds.includes(this.context.loggedInUser._id)){
        this.setState({ userToDisplayIsFollowed: true })
      } 
    else {
      this.setState({ userToDisplayIsFollowed: false })
    }
  }

  getUser = async () => {
    try {
      const userToDisplay = await GET_USER(this.props.user._id)
      this.setState({ userToDisplay })
      this.checkIfuserToDisplayIsFollowed(userToDisplay)
    } catch(err){
      console.log(err)
    }
  }

  onSubmitHandler = async e => {
    e.preventDefault()
    try {
      console.log(this.state.userToDisplay._id)
      await FOLLOW_USER(this.state.userToDisplay._id)
      await this.getUser()
    } catch(err){
      console.log(err)
    }
  }

  render () {
      if(this.state.userToDisplay && this.state.userToDisplay._id === this.context.loggedInUser._id)
      return <div></div>

    return (
        
      <form onSubmit={this.onSubmitHandler}>
        {this.state.userToDisplayIsFollowed
          ? <button className='unfollow-btn'>Unfollow</button>
          : <button className='follow-btn'>Follow</button>}
      </form>
    )
  }
}
export default FollowUserBtn
