import '../scss/UserProfile.scss'
import React from 'react'
import {Link} from 'react-router-dom';
import AuthContext  from '../../contexts/AuthContext'
import { FOLLOW_USER, GET_USER } from '../../api/userAPI'
import editPencil from '../../images/edit-pencil.png'

class UserProfile extends React.Component {
  static contextType = AuthContext
  
  state = { 
      content: '',
      mediaFile: [],
      pageUser: null,
      pageUserIsFollowed: null
    }
  
    async componentDidMount(){
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
        const user = await GET_USER(this.props.profilePageId)
        this.setState({ pageUser: user })
        this.checkIfPageUserIsFollowed()
      } catch(err){
        console.log(err)
      }
    }
    onSubmitHandler = async e => {
      e.preventDefault()
      try {
        await FOLLOW_USER(this.props.profilePageId)
        await this.getUser()
      } catch(err){
        console.log(err)
      }
    }

  render () {
    const loggedInUser = this.context.loggedInUser
    const pageUser = this.state.pageUser
    const backgroundImage = this.context.loggedInUser && this.context.loggedInUser.backgroundPicture ? this.context.loggedInUser.backgroundPicture.url : "https://via.placeholder.com/500"
    const profileImage = this.context.loggedInUser && this.context.loggedInUser.profilePicture ? this.context.loggedInUser.profilePicture.url : "https://vignette.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest?cb=20140126234206"

   return (
      <div className="user-profile">
             <div className="edit-profile-icon">
               {(this.context.loggedInUser && this.props.profilePageId === this.context.loggedInUser._id) ?  
               <Link to={`/profile/edit/${this.props.profilePageId}`}><img src={editPencil} /></Link> :
                  <form onSubmit={this.onSubmitHandler}>
                    {this.state.pageUserIsFollowed ? 
                      <button className='unfollow-btn'>Unfollow</button> :
                      <button className='follow-btn'>Follow</button> 
                      }
                 </form> 
               }
             </div>
             {pageUser && 
             <div className="user-profile-header">
                   <div className="user-info ">
                    <h1>{pageUser.firstName} {pageUser.lastName}</h1>
                    <p>{pageUser.bio}</p>
                   </div>
             </div>
             }
      </div>

    
    )
  }
}

export default UserProfile
