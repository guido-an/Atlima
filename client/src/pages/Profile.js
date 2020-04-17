import '../components/scss/profile.scss'
import React from 'react'
import UserProfile from '../components/Profile/UserProfile'
import UserPosts from '../components/Post/UserPosts'

class Profile extends React.Component {
  render () {
    const userId = this.props.match.params.id
    return (
      <div>

        <UserProfile />
        <UserPosts userId={userId} />
      </div>
    )
  }
}

export default Profile
