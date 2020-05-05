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
      <nav className='absolute-bot'>
        <div className="ui secondary fluid four item menu">
          <Link to="/" className="item"><i className="home icon"></i></Link>
          <Link to="#" onClick={this.logoutUser} className="item">
            <i className="search icon"></i>
          </Link>
          <Link to="/create-post" className="item">
            <i className="plus icon"></i>
          </Link>
          <Link to={`/profile/${this.context.loggedInUser._id}`} className="item">
            <i className="user icon"></i>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;




