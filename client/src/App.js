import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar'; 
import EditProfile from './components/Profile/EditProfile';
import Private from './components/Private';

import Signup from './components/Signup';
import Login from './components/Login';
import NewPost from './components/Post/New';


class App extends React.Component {
  static contextType = AuthContext

  componentDidMount(){
    this.context.fetchUser(); 
  }
  
  render() {
    return (
      <div>
      {this.context.loggedInUser && <Navbar /> }      
        <Switch>
  
        <Route
            exact path="/"
            component={Home} />
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
            exact path="/profile/:id"
            component={Profile} />
          />
      
          <Route
            path="/create-post"
            component={NewPost} />
          />   

          <Route
            path="/profile/edit/:id"
            component={EditProfile} />
          /> 

          <ProtectedRoute
           path='/private'
           render={(props) => <Private {...props} auth='test' />}
            />
          
        </Switch>
      </div>
    );
  }
}

export default App;
