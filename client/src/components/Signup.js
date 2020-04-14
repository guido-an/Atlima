import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'


export default class Signup extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try{
    await this.context.signup(this.state) 
    this.context.setUser(this.state)
    this.props.history.push('/')
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
          <input onChange={this.handleChange} type="email" placeholder="email" name="email" />
          <input onChange={this.handleChange} type="password" name="password" />
          <button>Signup</button>
        </form>
      </div>
    );
  }
}
