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
      <img className='ui tiny left floated circular image' src='https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/21909982_1709485809063197_5049790390769549312_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&amp;_nc_ohc=OvF467UtqkcAX_oQoTM&amp;oh=182b4f0e950a264e9dc9a73f074e9f05&amp;oe=5EC20E4D' />
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
