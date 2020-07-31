import React from 'react'
import axios from 'axios'

const Context = React.createContext()

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export class AuthStore extends React.Component {
    state = { 
      loggedInUser: null, 
      isLoadingUser: true, 
      unreadNotifications: null
    };
    
    signup = async user => {
      const data = await service.post('/auth/signup', user)
      return data
    }

   login = async user => {
      const { data } = await service.post('/auth/login', user)
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
            isLoadingUser: false
          });
        } catch(err) {
          this.setState({
            loggedInUser: null,
          });
        }
    };

    getUnreadNotifications = async () => {
      try {
        const response = await service.get('/profile/unread-notifications')
        console.log(response, 'response')
        this.setState({ unreadNotifications: response.data.unreadNotifications })
      } catch(err){
        console.log(err)
      }
    }

    resetUnreadNotifications = async () => {
       try {
         await service.get(`/profile/reset-unread-notifications`)
         this.setState({ unreadNotifications: 0 })
       } catch(err){
          console.log(err)
      }
    }    
  
  render(){
    const { signup, login, logout, setUser, fetchUser, getUnreadNotifications, resetUnreadNotifications } = this
      return(
          <Context.Provider 
              value={{ ...this.state, 
              signup, 
              login, 
              logout, 
              setUser, 
              fetchUser, 
              getUnreadNotifications,
              resetUnreadNotifications }}>
              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



