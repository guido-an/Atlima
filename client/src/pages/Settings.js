import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import SectionIntroduction from '../components/SectionIntroduction'
import AuthContext from '../contexts/AuthContext'

class Settings extends React.Component {
    static contextType = AuthContext

    state = { redirect: false }

    logoutUser = () =>{
        this.context.logout()
        .then(() => {
          this.context.setUser(null);  
          this.setState({ redirect: true })
        })
        
      }

  render () {
    if (this.state.redirect) {
        return <Redirect to='/'/>;
      }
    return (
      <div>
        <SectionIntroduction title='Settings' />
           <p
              onClick={this.logoutUser} 
              style={{ paddingTop: '120px', textAlign: 'center', display: 'block' }}>
            Logout
         </p>
         <div className="divider" style={{margin: '0 5vw'}}/>
      </div>
    )
  }
}

export default Settings
