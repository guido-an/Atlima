import React, {Component} from 'react';
import AuthContext  from '../contexts/AuthContext'
import FacebookLogin from './FacebookLogin'


export default class Login extends Component {
  static contextType = AuthContext

  state = {
    username: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const loggedInUser = await this.context.login(this.state);
      this.context.setUser(loggedInUser.currentUser);
      this.props.history.push('/private');
    } catch (err) {
      console.log(err, "message");
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="name"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <button>Login</button>
        </form>
        <FacebookLogin/>
      </div>
    );
  }
}
