import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home';
import Profile from './pages/Profile';
import OnBoarding from './pages/OnBoarding';
import SpotsMap from './pages/SpotsMap';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Landing from './pages/Landing';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import PostLikes from './pages/ListOfUsers/PostLikes';
import FollowedUsers from './pages/ListOfUsers/FollowedUsers';
import FollowedBy from './pages/ListOfUsers/FollowedBy';
import SpotFollowers from './pages/ListOfUsers/SpotFollowers';

import Navbar from './components/Navbar'; 
import EditProfile from './components/Profile/EditProfile';
import Signup from './components/Signup';
import Login from './components/Login';
import Spinner from './components/Spinner.js'

class App extends React.Component {
  static contextType = AuthContext

  async componentDidMount() {
   await this.context.fetchUser(); 
    if(this.context.loggedInUser){
      await this.context.getUnreadNotifications()
    }
  }
  
  render() {
    if (this.context.isLoadingUser)
      return <Spinner/>
    return (
      <div>
      {this.context.loggedInUser && <Navbar /> }    
      
        <Switch>      
          { this.context.loggedInUser ?
          <ProtectedRoute
              exact path="/"
              user={this.context.loggedInUser}
              component={Home}
            /> : 
            <Route exact path="/" component={Landing} user={this.context.loggedInUser}/>
          }

            <Route
              path="/login"
              component={Login} />
  
            <Route
              path="/signup"
              component={Signup} />
            
  
            <Route
              path="/onboarding"
              component={OnBoarding} />
            
  
            <Route
              exact path="/profile/:id"
              component={Profile} />
          
        
            <Route
              path="/create-post"
              component={CreatePost} />
             

            <Route
              exact path="/post/:id"
              component={Post} />
         
              <Route
                 path="/post/:id/likes"
                 render={props => <PostLikes {...props} title="Post Likes" />}
               />  

              <Route
                 path="/profile/edit/:id"
                 render={props => <EditProfile {...props} loggedInUser={this.context.loggedInUser} />}
                />     

                <Route
                 path="/profile/:id/following"
                component={FollowedUsers} />

    
            <Route
              path="/profile/:id/followers"
              component={FollowedBy} />

            <Route
              path="/spots-map"
              component={SpotsMap} />
             
              <Route
                 path="/spot/:id/followers"
                 render={props => <SpotFollowers {...props} title="Spot Followers" />}
               />  

            <Route
              path={`/:id/notifications`}
              component={Notifications} />

            <Route
              path={`/settings`}
              component={Settings} />

        </Switch>
      </div>
    );
  }
}

export default App;
