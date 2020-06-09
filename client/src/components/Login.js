import '../components/scss/login.scss'
import '../components/scss/buttons.scss'
import { Link } from 'react-router-dom'
import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'
import FacebookLogin from './FacebookLogin'


export default class Login extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
    errorMessage: null
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ errorMessage: null })
  };

  handleSubmit = async e => {
    console.log('submit')
    e.preventDefault()
    try {
      const loggedInUser = await this.context.login(this.state);
      this.context.setUser(loggedInUser.currentUser);
      this.props.history.push('/');
    } catch (err) {
      console.log(err, 'from login')  
      this.setState({ errorMessage: err.response.data.errorMessage })
    }
  };


  render() {
    return (
      <div className='login'>
        <h1 >altima</h1>
        <FacebookLogin/>
        <div className='or-line'>
          <hr className='left'></hr> <span>or</span> <hr className='right'></hr>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
          />
          <label>Password</label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
          />
          <p style={{ margin: '0'}}>{this.state.errorMessage}</p> 
          <button className='primary-btn'>Login</button>
          <p>Don't you have an acount? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    );
  }
}
