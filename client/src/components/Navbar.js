import './scss/navbar.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext  from '../contexts/AuthContext'
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

class NavBar extends React.Component {
  static contextType = AuthContext

  // logoutUser = () =>{
  //   this.context.logout()
  //   .then(() => {
  //     this.context.setUser(null);  
  //   })
  // }
  

  render() {
    return (
      <nav className='absolute-bot'>
        <div className="ui secondary fluid five item menu">
          <NavLink to="/" className="item" activeClassName="active" exact>
            <HomeIcon className="icon-navbar" />
          </NavLink>
          <NavLink to="/spots-map" className="item" activeClassName="active">
            <MapIcon className="icon-navbar" />
          </NavLink>
          <NavLink to="/create-post" className="item" activeClassName="active">
            <AddCircleOutlineIcon className="icon-navbar" />
          </NavLink>
          <NavLink to={`/${this.context.loggedInUser._id}/notifications`} className="item" activeClassName="active" exact>
            <NotificationsIcon className="icon-navbar" />
            {this.context.unreadNotifications >= 1 && 
              <div className="notification-number-1"><span>{this.context.unreadNotifications}</span></div>
            }
            {this.context.unreadNotifications >= 10 && 
              <div className="notification-number-2"><span>10+</span></div>
            }
          </NavLink>
          <NavLink to={`/profile/${this.context.loggedInUser._id}`} className="item" activeClassName="active">
            <PersonIcon className="icon-navbar" />
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;




