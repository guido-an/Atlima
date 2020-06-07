import React from 'react'
import AuthContext  from '../../contexts/AuthContext'
import { EDIT_USER } from '../../api/userAPI'
import ImageUpload from '../Post/ImageUpload'

class EditProfile extends React.Component {
  static contextType = AuthContext

  state = { 
    mediaFile: [],
    firstName: "",
    lastName: "",
    team: "",
    hometown: "",
    country: "",
    }
  
  onSubmit = async e => {
    e.preventDefault();
      try {
      await EDIT_USER(
        this.context.loggedInUser._id,
        this.state.mediaFile,
        this.state.firstName,
        this.state.lastName,
        this.state.team,
        this.state.hometown,
        this.state.country
      )
      this.context.fetchUser()
    }  catch(err){
          console.log(err)
     }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }


    getMediaFile = url => {
      this.setState({ mediaFile: [...this.state.mediaFile, url]})
    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <ImageUpload getMediaFile={this.getMediaFile}/>
            <input onChange={this.onInputChange} placeholder={this.context.loggedInUser && this.context.loggedInUser.firstName} type="text" name="firstName"/>
            <input onChange={this.onInputChange} placeholder={this.context.loggedInUser && this.context.loggedInUser.lastName} type="text" name="lastName"/>
            <input onChange={this.onInputChange} placeholder={this.context.loggedInUser && this.context.loggedInUser.team} type="text" name="team"/>
            <input onChange={this.onInputChange} placeholder={this.context.loggedInUser && this.context.loggedInUser.hometown} type="text" name="hometown"/>
            <input onChange={this.onInputChange} placeholder={this.context.loggedInUser && this.context.loggedInUser.country} type="text" name="country"/>
            <button>Update User</button>
        </form>
      </div>
    )
  }
}

export default EditProfile
