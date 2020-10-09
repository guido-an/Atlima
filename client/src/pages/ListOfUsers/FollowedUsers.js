import '../../components/scss/general.scss' 
import React from 'react'
import { Link } from 'react-router-dom'
import SectionIntroduction from '../../components/SectionIntroduction'
import Avatar from '../../components/Profile/Avatar'
import FollowUserBtn from '../../components/FollowUserBtn'
import ProfilePictureDefault from '../../components/Profile/ProfilePictureDefault'
import AuthContext from '../../contexts/AuthContext'
import { GET_USER } from '../../api/userAPI'

class UserFollowing extends React.Component {
 static contextType = AuthContext

 state = { user: null }

 async componentDidMount(){
    const userId = this.props.match.params.id
    try {
       const user = await GET_USER(userId)
       this.setState({ user })
    }
   catch(err) {
      console.log(err)
   }
 }

  render () {

      if(!this.state.user)
      return <p></p>
      const { firstName, lastName } = this.state.user
    return (
      <div>
        <SectionIntroduction title='Following' />
        <div style={{ paddingTop: '80px'}}>
         {this.state.user.followedUsers.map((user, i) => {
             return<div key={i} style={{ margin: '30px 5vw'}}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Avatar user={user}/>  
                  <FollowUserBtn user={user}/>
               </div>
                <div className="divider"/>
             </div>
         })}
        </div>
      </div>
    )
  }
}

export default UserFollowing
