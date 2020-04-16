import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthContext  from './contexts/AuthContext'
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Private from './components/Private';
import Login from './components/Login';
import NewPost from './components/Post/New';
import AllPosts from './components/Post/AllPosts';
import UserPosts from './components/Post/UserPosts';

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
      {/* <p> {this.context.loggedInUser && 'Hello' + this.context.loggedInUser.firstName}</p> */}
       {this.context.loggedInUser ? <AllPosts /> : <Login />}
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
      
          <Route
            path="/create-post"
            component={NewPost} />}
   
          />    
          <Route
            path="/all-posts"
            component={AllPosts} />}
          />   
          <Route
            path="/user-posts/:id"
            component={UserPosts} />}
          />       

        </Switch>
      </div>
    );
  }
}

export default App;
