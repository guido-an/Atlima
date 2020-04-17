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
      <nav className='aboslute-bot'>
        <div class="ui secondary fluid four item menu">
          <Link to="/" className="item"><i class="home icon"></i></Link>
          <Link to="#" onClick={this.logoutUser} className="item">
            <i class="search icon"></i>
          </Link>
          <Link to="/create-post" className="item">
            <i class="plus icon"></i>
          </Link>
          <Link to="/create-post" className="item">
            <i class="user icon"></i>
          </Link>
        </div>
      </nav>
      
    );
  }
}

export default NavBar;
