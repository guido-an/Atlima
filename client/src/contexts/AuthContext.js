import React from 'react'
import axios from 'axios'

const Context = React.createContext()

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export class AuthStore extends React.Component {
    state = { loggedInUser: null, isLoadingUser: true };
    
    signup = async user => {
      const data = await service.post('/auth/signup', user)
      return data
    }

   login = async user => {
      const { data } = await service.post('/auth/login', user)
      console.log(data, 'data from auth context')
      return data
    }
   
   logout = async () => {
      const { data } = await service.get('/auth/logout')
      return data
    }

   loggedin = async () => {
    const { data } = await service.get('/auth/loggedin')
    return data.user
   }

    setUser = user => {
        this.setState({
          loggedInUser: user
        });
      };

    fetchUser = async () => {
        try {
          const res = await this.loggedin();
          this.setState({
            loggedInUser: res,
            loadingUser: false
          });
        } catch(err) {
          console.log(err, 'err from context')
          this.setState({
            loggedInUser: null,
          });
        }
    };
  
  render(){
    const { signup, login, logout, setUser, fetchUser } = this
      return(
          <Context.Provider 
              value={{ ...this.state, signup, login, logout, setUser, fetchUser }}>
              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



