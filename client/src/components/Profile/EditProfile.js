import '../scss/EditProfile.scss'
import React from 'react'
import { Redirect } from 'react-router-dom'
import CategoryContext  from '../../contexts/CategoryContext'
import { EDIT_USER, GET_USER } from '../../api/userAPI'
import ImageUpload from '../Post/ImageUpload'
import CategoriesOnBoarding from '../Categories/CategoriesOnBoarding'
import SelectionCategories from '../Categories/SelectionCategories'

class EditProfile extends React.Component {
  static contextType = CategoryContext

  state = { 
    profilePicture: this.props.loggedInUser && this.props.loggedInUser.profilePicture || null,
    backgroundPicture: this.props.loggedInUser && this.props.loggedInUser.backgroundPicture || null,
    firstName: "",
    lastName: "",
    location: "",
    bio: "",
    loggedInUser: null
    }
 
    async componentDidMount(){
      await this.getUser()
      this.context.cleanSelectedCategoriesIds()
      this.context.fillSelectedCategoriesIds(this.state.loggedInUser.categories)
      await this.context.getCategories()
    }
    // componentDidMount () {
    //   this.context.cleanSelectedCategoriesIds()
    //   this.props.loggedInUser && this.context.fillSelectedCategoriesIds(this.props.loggedInUser.categories)
    //   this.context.getCategories()
    // }

    getUser = async () => {
      try {
        const user = await GET_USER(this.props.loggedInUser._id)
        this.setState({ loggedInUser: user })
      } catch(err){
        console.log(err)
      }
    }
  
    
  onSubmit = async e => {
    e.preventDefault();
    e.persist()
      try {
        await EDIT_USER(
        this.props.loggedInUser._id,
        this.state.backgroundPicture,
        this.state.profilePicture,
        this.state.firstName,
        this.state.lastName,
        this.state.location,
        this.state.bio
      )
        this.context.onSubmitUserCategories(e)     
       // window.location.reload();
        await this.getUser()
    }  catch(err){
      alert('err')
          console.log(err)
     }
  };
    
    onInputChange = e => {
         //e.persist();
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

    getBackgroundPicture = file => {
      this.setState({ backgroundPicture:  file})
    }

    getProfilePicture = file => {
      this.setState({ profilePicture:  file})
    }
    
   
  render () {
    if(!this.state.loggedInUser)
    return <p></p>
  const backgroundImageBeforeUpdate = this.props.loggedInUser && this.props.loggedInUser.backgroundPicture || "https://vignette.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest?cb=20140126234206"
  const profileImageBeforeUpdate =  this.props.loggedInUser && this.props.loggedInUser.profilePicture || "https://vignette.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest?cb=20140126234206"
    return (
    <div className="edit-profile">
        <form onSubmit={this.onSubmit}>
           <div style={{
               backgroundImage: this.state.backgroundPicture ? `url('${this.state.backgroundPicture.url}')` : `url('${backgroundImageBeforeUpdate}')`,
               height: "70vh",
               backgroundSize: "cover",
               backroundPosition: "center"
             }} />
            <div className="edit-background-picture">
                <ImageUpload id={1} getBackgroundPicture={this.getBackgroundPicture}/>
            </div>
            <div style={{ 
                   backgroundImage: this.state.profilePicture ? `url('${this.state.profilePicture.url}')` : `url('${profileImageBeforeUpdate}')`,
                   borderRadius: "50%",
                   height: "150px",
                   width: "150px",
                   backgroundSize: "cover",
                   backroundPosition: "center",
                   position: "relative",
                   bottom: "90px",
                   left: "20px"
                  }} /> 
           
             <div className="edit-profile-picture">
               <ImageUpload id={2} getProfilePicture={this.getProfilePicture} />
             </div>

            <div className="input-container">
               <label>First Name</label>
               <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.firstName} type="text" name="firstName"/>
               <label>Last Name</label>
               <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.lastName} type="text" name="lastName"/>
               <label>Location</label>
               <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.location} type="text" name="location"/>
               <label>Bio</label>
               <textarea onChange={this.onInputChange} placeholder={this.state.loggedInUser.bio} type="text" name="bio"/>
               <label>Choose the sports to follow</label>
               <SelectionCategories categoryContext={this.context} loggedInUser={this.state.loggedInUser}/>
               <button>Update</button>
            </div>
        </form>
      </div>
    )
  }
}

export default EditProfile