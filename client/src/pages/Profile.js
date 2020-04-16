import React from 'react';
import UserPosts from '../components/Post/UserPosts'


class Profile extends React.Component {
  render() {

    return (
     <div>
         <h1>Profile</h1>
         <UserPosts />
   </div>
    );
  }
}

export default Profile;
