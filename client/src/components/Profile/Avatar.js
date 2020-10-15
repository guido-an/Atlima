import React from 'react'
import { Link } from 'react-router-dom'
import ProfilePictureDefault from './ProfilePictureDefault'

class Avatar extends React.Component {
  render () {
    return (

      <div style={{ display: 'flex ' }}>
        {this.props.user.profilePicture
          ? <img className='ui avatar image circular' src={this.props.user.profilePicture.url} />
          : <ProfilePictureDefault
            user={this.props.user}
            heightAndWidth='40px'
            fontSize='16px'
            top='10px'
            />}
        <Link
          to={`/profile/${this.props.user._id}`}
          style={{ fontWeight: '500', marginLeft: '10px' }}
        >
          {this.props.user.firstName} {this.props.user.lastName}
        </Link>
      </div>
    )
  }
}

export default Avatar
