import '../components/scss/profile.scss'
import React from 'react'
import UserPosts from '../components/Post/UserPosts'

class Profile extends React.Component {
  render () {
    const userId = this.props.match.params.id
    return (
      <div class="profile-body">
        <h4 class="header">Federico Barriola</h4>
        <img class="ui tiny left floated circular image" src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/21909982_1709485809063197_5049790390769549312_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&amp;_nc_ohc=OvF467UtqkcAX_oQoTM&amp;oh=182b4f0e950a264e9dc9a73f074e9f05&amp;oe=5EC20E4D"></img>
        <div class="content right floated profile-basics">
          <div class="ui horizontal list">
            <div class="item">
              <div class="content">
                <div class="header">Posts</div>
                <p>50</p>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="header">Followers</div>
                <p>440</p>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="header">Following</div>
                <p>500</p>
              </div>
            </div>
          </div>
        </div>
          <button class="ui primary fluid button">Follow</button>
        <div class="block">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
             Lorem Ipsum has been the industry's.</p>
        </div>
        <div class="ui two item profile-menu">
          <a class="item active">Posts</a>
          <a class="item">liked</a>
        </div>
          <UserPosts userId={userId} />
      </div>
    )
  }
}

export default Profile
