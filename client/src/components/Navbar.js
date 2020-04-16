import './scss/navbar.scss'
import React from 'react';
import {Link} from 'react-router-dom';
import AuthContext  from '../contexts/AuthContext'

class NavBar extends React.Component {
  static contextType = AuthContext

  logoutUser = () =>{
    this.context.logout()
    .then(() => {
      this.context.setUser(null);  
    })
  }

  render() {
    return (
      <header>
 
          <Link to="/" className="nav-a">Home</Link>
          <Link to="#" onClick={this.logoutUser} className="nav-a">Logout</Link>
          <Link to="/create-post" className="nav-a">Create post</Link>
          <Link to={`/profile/${this.context.loggedInUser._id}`} className="nav-a">Profile</Link>
    
        
    
      </header>
      
    );
  }
}

export default NavBar;
