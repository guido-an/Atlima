import '../components/scss/profile.scss'
import React from 'react'
import UserProfile from '../components/Profile/UserProfile'
import UserPosts from '../components/Post/UserPosts'

class Profile extends React.Component {
  render () {
    const profilePageId = this.props.match.params.id
    return (
      <UserProfile profilePageId={profilePageId} />
    )
  }
}

export default Profile
