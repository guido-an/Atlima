import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'


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
      <div>
          <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" placeholder="First name" name="firstName" />
          <input onChange={this.handleChange} type="text" placeholder="Last name" name="lastName" />
          <input onChange={this.handleChange} type="email" placeholder="Email" name="email" />
          <input onChange={this.handleChange} type="password" placeholder="******" name="password" />
          <button>Signup</button>
        </form>
      </div>
    );
  }
}
