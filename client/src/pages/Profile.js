import React from 'react'
import UserPosts from '../components/Post/UserPosts'

class Profile extends React.Component {
  render () {
    const userId = this.props.match.params.id
    return (
      <div>
        <h1>Profile</h1>
        <UserPosts userId={userId} />
      </div>
    )
  }
}

export default Profile
