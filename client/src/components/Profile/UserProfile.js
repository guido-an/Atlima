import React from 'react'
import {Link} from 'react-router-dom';
import AuthContext  from '../../contexts/AuthContext'

class UserProfile extends React.Component {
  static contextType = AuthContext
  

  state = { 
      content: '',
      mediaArray: []
    }
  

  render () {
    return (
      <div className='profile-body'>
        <Link to={`/profile/edit/${this.context.loggedInUser && this.context.loggedInUser._id}`} className="item">
            <i className="user icon"></i>
          </Link>
  <h4 className='header'>Federico Barriola</h4>
        <div className='content right floated profile-basics'>
        <div className='ui horizontal list'>
          <div className='item'>
            <div className='content'>
              <div className='header'>Posts</div>
              <p>50</p>
            </div>
          </div>
          <div className='item'>
            <div className='content'>
              <div className='header'>Followers</div>
              <p>440</p>
            </div>
          </div>
          <div className='item'>
            <div className='content'>
              <div className='header'>Following</div>
              <p>500</p>
            </div>
          </div>
        </div>
      </div>
      <button className='ui primary fluid button'>Follow</button>
      <div className='block'>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's.
        </p>
      </div>
      <div className='ui two item profile-menu'>
        <a className='item active'>Posts</a>
        <a className='item'>liked</a>
      </div>
      {/* <UserPosts userId={userId} /> */}
    </div>
    )
  }
}

export default UserProfile
