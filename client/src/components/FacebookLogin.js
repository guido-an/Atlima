import '../components/scss/buttons.scss'
import React from 'react'

class FacebookLogin extends React.Component {
  render () {
    return (
      <div>
        <a href='https://altima-app.herokuapp.com/auth/facebook' className='facebook-btn'><i className='fab fa-facebook' />Login with Facebook</a>
      </div>
    )
  }
}

export default FacebookLogin
