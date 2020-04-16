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
 
          <Link to="/">Home</Link>
          <Link to="/auth/signup">Signup</Link>
       
         { this.context.loggedInUser ?  <Link to="#" onClick={this.logoutUser}>Logout</Link> : <Link to="/auth/login">Login</Link> }
    
          <br/><Link to="/create-post">
            Create post
          </Link><br/>
          <Link to="/all-posts">
            All posts
          </Link><br/>
          {this.context.loggedInUser && 
          
            <Link to={`/user-posts/${this.context.loggedInUser._id}`}>
            User posts
            </Link>
          }
    
      </header>
    );
  }
}

export default NavBar;
