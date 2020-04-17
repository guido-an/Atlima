import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'

import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import Login from './components/Login';
import NewPost from './components/Post/New';


class App extends React.Component {
  static contextType = AuthContext

  componentDidMount(){
    this.context.fetchUser(); 
  }
  
  render() {
    console.log(this.context, 'from app')

    return (
      <div>
      {this.context.loggedInUser && <Navbar />} 
      {/* {this.context.loggedInUser ? <Home /> : <Login />} */}
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
            path="/profile/:id"
            component={Profile} />
          />
      
          <Route
            path="/create-post"
            component={NewPost} />
          />    

        </Switch>
      </div>
    );
  }
}

export default App;
