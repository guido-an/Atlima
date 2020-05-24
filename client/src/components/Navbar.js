import './scss/navbar.scss'
import React from 'react';
import {NavLink} from 'react-router-dom';
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
        <div className="ui secondary fluid five item menu">
          <NavLink to="/" className="item" activeClassName="active"><i className="home icon" ></i></NavLink>
          <NavLink to="/spots-map" className="item" activeClassName="active">
            <i className="fas fa-map-marked-alt"></i>
          </NavLink>
          <NavLink to="/create-post" className="item" activeClassName="active">
            <i className="fas fa-plus-circle"></i>
          </NavLink>
          <NavLink to="/logout" onClick={this.logoutUser} className="item" activeClassName="active">
            <i className="fas fa-bell"></i>
          </NavLink>
          <NavLink to={`/profile/${this.context.loggedInUser._id}`} className="item" activeClassName="active">
            <i className="user icon"></i>
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;




