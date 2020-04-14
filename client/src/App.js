import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Private from './components/Private';
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
        <Route path="/" component={Navbar}/>
      <p>Hello {this.context.loggedInUser && this.context.loggedInUser.firstName}</p>
        <Switch>
          <Route
            path="/auth/signup"
            component={Signup}/>}
          />
          <Route
            path="/auth/login"
            component={Login} />}
          />
          <ProtectedRoute
            path="/private"
            component={Private}
          />
          <NewPost/>
        </Switch>
      </div>
    );
  }
}

export default App;
