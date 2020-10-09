import '../components/scss/buttons.scss'
import React from 'react'

class FacebookLogin extends React.Component {
  render () {
    return (
      <div onClick={() => alert("Still in development mode, waiting for Mark's approval :)")}>
        {/* <a href='https://altima-sport-app.herokuapp.com/auth/facebook' className='facebook-btn'><i className='fab fa-facebook' />Continue with Facebook</a> */}
        <a href='#' className='facebook-btn'><i className='fab fa-facebook' />Continue with Facebook</a>
      </div>
    )
  }
}

export default FacebookLogin
