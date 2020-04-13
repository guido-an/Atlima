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
       
   
          <Link to="/auth/login">Login</Link>
          <Link to="#" onClick={this.logoutUser}>
            Logout
          </Link>
  
          <Link to="/private">
            Private
          </Link>
    
      </header>
    );
  }
}

export default NavBar;
