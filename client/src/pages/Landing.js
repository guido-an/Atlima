import '../components/scss/login.scss'
import '../components/scss/buttons.scss'
import { Link } from 'react-router-dom'
import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'
import FacebookLogin from '../components/FacebookLogin'
import landingImg1 from '../images/landing.jpeg'
import landingImg2 from '../images/landing2.gif'
import landingImg3 from '../images/landing3.jpeg'
import landingImg4 from '../images/landing4.jpeg'
import logo from '../images/altima-logo.png'


export default class Landing extends Component {
  static contextType = AuthContext

  render() {
    return (
      <div className='landing'>
        <div className="landing-header">
          <img className='landing-img-1' src={landingImg1}  />
          <img className='landing-img-2' src={landingImg2}  />
          <img className='landing-img-3' src={landingImg3}  />
          <img className='landing-img-4' src={landingImg4}  />
        </div>
        <div className="landing-body">
          <img src={logo} alt="altima-logo"
            style={{ display: 'block', margin: '0 auto', width: '120px'}}
          />
          <p>Join the communuity of athletes from all over the world, get inspired and achieve your goals</p>
          <FacebookLogin/>
          <Link to='/signup'><button className='primary-btn'>Signup</button></Link>
          <p>Already have an acount? <Link to="/login" className="link">Login</Link></p>
        </div>
      </div>
    );
  }
}


