import '../components/scss/Landing.scss'
import '../components/scss/buttons.scss'
import { Link } from 'react-router-dom'
import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'
import FacebookLogin from '../components/FacebookLogin'
import landingImg1 from '../images/landing.jpeg'
import landingImg2 from '../images/landing-2.jpg'
import landingImg3 from '../images/landing3.jpeg'
import landingImg4 from '../images/landing4.jpeg'
import logo from '../images/logo-atlima.png'


export default class Landing extends Component {
  static contextType = AuthContext

  render() {
    return (
      <div className='landing'>
        <div className="landing-header">
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
             <div class="img-landing" style={{ background: `url('${landingImg1}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', height: '200px', marginRight: '10px' }}></div>
             <div class="img-landing" style={{ background: `url('${landingImg3}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', height: '150px', borderRadius: '0 0 0 10px'}}></div>
          </div> 
          <div style={{ display: 'flex'}}>
             <div class="img-landing" style={{ background: `url('${landingImg4}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', height: '200px', marginTop: '10px', position: 'relative', right: '10px', borderRadius: '0 10px 0 0'}}></div>
             <div class="img-landing" style={{ background: `url('${landingImg2}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '400px', height: '100px', position: 'relative', bottom: '40px', right: '0px', borderRadius: '10px 0 0 0'}}></div>
          </div> 
        </div>
        <div className="landing-body">
          <img src={logo} id="logo" alt="atlima-logo"
            style={{ display: 'block', margin: '0 auto', width: '120px'}}
          />
          <p id="atlima-description">Join the communuity of athletes from all over the world, get inspired and achieve your goals.</p>
          {/* <FacebookLogin/> */}
          <div style={{ textAlign: "center"}}>
         
             <Link to='/signup'><button className='primary-btn'>Signup</button></Link>
          </div>
          <p>Already have an acount? <Link to="/login" className="link">Login</Link></p>
        </div>
      </div>
    );
  }
}


