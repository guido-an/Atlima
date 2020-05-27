import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home';
import Profile from './pages/Profile';
import OnBoarding from './pages/OnBoarding';
import SpotsMap from './pages/SpotsMap';
import CreatePost from './pages/CreatePost';

import Navbar from './components/Navbar'; 
import EditProfile from './components/Profile/EditProfile';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends React.Component {
  static contextType = AuthContext

  componentDidMount(){
    this.context.fetchUser(); 
  }
  
  render() {
    if (this.context.isLoadingUser)
      return <p>Loading...</p>
    return (
      <div>
      {this.context.loggedInUser && <Navbar /> }    
      
        <Switch>      
          <ProtectedRoute
              exact path="/"
              user={this.context.loggedInUser}
              component={Home}
            />
            
            <Route
              path="/login"
              component={Login} />
            />  
  
            <Route
              path="/signup"
              component={Signup} />
            /> 
  
            <Route
              path="/onboarding"
              component={OnBoarding} />
            /> 
  
            <Route
              exact path="/profile/:id"
              component={Profile} />
            />
        
            <Route
              path="/create-post"
              component={CreatePost} />
            />   
  
            <Route
              path="/profile/edit/:id"
              component={EditProfile} />
            /> 
          
            <Route
              path="/spots-map"
              component={SpotsMap} />
            /> 
        </Switch>
      </div>
    );
  }
}

export default App;
