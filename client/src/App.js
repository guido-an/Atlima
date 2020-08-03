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

import Navbar from './components/Navbar'; 
import EditProfile from './components/Profile/EditProfile';
import Signup from './components/Signup';
import Login from './components/Login';

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
      return <p>Loading...</p>
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
            />  

            <Route
              path="/post/:id"
              component={Post} />
            />  
  
            {/* <Route
              path="/profile/edit/:id"
              component={EditProfile} /> */}

              <Route
                 path="/profile/edit/:id"
                 render={props => <EditProfile {...props} loggedInUser={this.context.loggedInUser} />}
                />     
                          
    
            <Route
              path="/spots-map"
              component={SpotsMap} />
            

            <Route
              path={`/:id/notifications`}
              component={Notifications} />
            

        </Switch>
      </div>
    );
  }
}

export default App;
