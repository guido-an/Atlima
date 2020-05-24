import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import AuthContext  from '../contexts/AuthContext'
import '../components/scss/signup.scss'
import '../components/scss/buttons.scss'


export default class Signup extends Component {
  static contextType = AuthContext

  state = {
    firstName: '',
    lastName:'',
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try{
    await this.context.signup(this.state) 
    this.context.setUser(this.state)
    this.context.fetchUser()
    this.props.history.push('/onboarding')
    }
    catch(err){
      console.log(err)
    }
  };
  
  render() {

    return (
      <div className='signup'>
          <h1>Altima</h1>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input onChange={this.handleChange} type="text" name="firstName" />
          <label>Last Name</label>
          <input onChange={this.handleChange} type="text" name="lastName" />
          <label>Email</label>
          <input onChange={this.handleChange} type="email" name="email" />
          <label>Password</label>
          <input onChange={this.handleChange} type="password"  name="password" />
          <button className='primary-btn'>Signup</button>          
          <p>Already have an acount? <Link to="/login">Login</Link></p>
        </form>
      </div>
    );
  }
}
