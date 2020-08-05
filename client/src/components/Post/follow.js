import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import { FOLLOW_USER , GET_USER } from '../../api/userAPI'
import '../scss/PostCard.scss'
import '../scss/Comments.scss'
import Discobolo  from '../../images/discobolo.jpg'

class Follow extends React.Component {
 static contextType = AuthContext
 state = { 
   user: null,
   pageUser: null,
   pageUserIsFollowed: null,
  }

  async componentDidMount(){
    const user = this.props.post.user
    this.setState({ user})
    try {
        await this.getUser()
      } catch(err){
        console.log(err)
      }
  }
  checkIfPageUserIsFollowed = () => {
    const user = this.state.pageUser
      if(user && user.followedBy.includes(this.context.loggedInUser._id)){
        this.setState({ pageUserIsFollowed: true })
      } 
    else {
      this.setState({ pageUserIsFollowed: false })
    }
  }

  getUser = async () => {
    try {
      const user = await GET_USER(this.state.user._id)
      this.setState({ pageUser: user })
      this.checkIfPageUserIsFollowed()
    } catch(err){
      console.log(err)
    }
  }

  onSubmitHandler = async e => {
    e.preventDefault()
    try {
      await FOLLOW_USER(this.state.user._id)
      await this.getUser()
    } catch(err){
      console.log(err)
    }
  }
  

  render () {
    return (
      <div className="follow">
        <form onSubmit={this.onSubmitHandler}>
            <img className='ui avatar image circular' src={this.props.post.user.profilePicture ? this.props.post.user.profilePicture.url : Discobolo } />
            <p>{this.props.post.user.firstName} {this.props.post.user.lastName}</p>
            {this.state.pageUserIsFollowed ? 
            <button className='unfollow-btn'>Unfollow</button> :
            <button className='follow-btn'>Follow</button> 
            }
        </form> 

        <div className="spacer"></div>
      </div>
    )
  }
}

export default Follow