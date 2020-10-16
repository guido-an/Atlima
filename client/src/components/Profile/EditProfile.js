// import '../scss/EditProfile.scss'
// import React from 'react'
// import { Redirect } from 'react-router-dom'
// import CategoryContext  from '../../contexts/CategoryContext'
// import { EDIT_USER, GET_USER } from '../../api/userAPI'
// import ImageUpload from '../Post/ImageUpload'
// // import CategoriesOnBoarding from '../Categories/CategoriesOnBoarding'
// import SelectionCategories from '../Categories/SelectionCategories'
// import ProfilePictureDefault from './ProfilePictureDefault'
// import SectionIntroduction from '../SectionIntroduction'

// class EditProfile extends React.Component {
//   static contextType = CategoryContext

//   state = { 
//     profilePicture: this.props.loggedInUser && this.props.loggedInUser.profilePicture || null,
//     backgroundPicture: this.props.loggedInUser && this.props.loggedInUser.backgroundPicture || null,
//     firstName: "",
//     lastName: "",
//     location: "",
//     bio: "",
//     loggedInUser: null
//   }
 
//     async componentDidMount(){
//       // if(!this.props.loggedInUser){
//       //   alert('helllo')
//       //   //return <Redirect to="/login"></Redirect>
//       //  }
//       await this.getUser()
//       this.context.cleanSelectedCategoriesIds()
//       const userCategoriesIds = this.state.loggedInUser.categories.map(category => category._id)
//       this.context.fillSelectedCategoriesIds(userCategoriesIds)
//       await this.context.getCategories()
//     }
  
//     getUser = async () => {
//       try {
//         const user = await GET_USER(this.props.loggedInUser._id)
//         this.setState({ loggedInUser: user })
//       } catch(err){
//         console.log(err)
//       }
//     }
  
    
//   onSubmit = async e => {
//     e.preventDefault();
//     e.persist()
//       try {
//         await EDIT_USER(
//         this.props.loggedInUser._id,
//         this.state.backgroundPicture,
//         this.state.profilePicture,
//         this.state.firstName,
//         this.state.lastName,
//         this.state.location,
//         this.state.bio
//       )
//         this.context.onSubmitUserCategories(e)     
//         window.location.reload();
//     }  catch(err){
//       alert('err')
//           console.log(err)
//      }
//   };
    
//     onInputChange = e => {
//         const { name, value } = e.target;
//         this.setState({
//           [name]: value,
//         });
//     }

//     getBackgroundPicture = file => {
//       this.setState({ backgroundPicture:  file})
//     }

//     getProfilePicture = file => {
//       this.setState({ profilePicture:  file})
//     }
    
   
//   render () {
//     if(!this.state.loggedInUser){
//     return <p></p> 
//     }
   
//     return (
//       <section>
//        <SectionIntroduction title='Edit Profile' saveEditProfile={this.onSubmit}/>
//       <div className="edit-profile">
//         <form onSubmit={this.onSubmit}>
//            {this.state.backgroundPicture ? 
//             <div style={{
//                backgroundImage: `url('${this.state.backgroundPicture.url}')`,
//                height: "60vh",
//                backgroundSize: "cover",
//                backroundPosition: "center"
//              }} /> :
//               <div style={{
//                  backgroundColor: '#737373',
//                  height: "60vh"
//                 }} />
//              }
//             <div className="edit-background-picture">
//                 <ImageUpload id={1} getBackgroundPicture={this.getBackgroundPicture}/>
//             </div>
//             {this.state.profilePicture ? 
//               <div style={{ 
//                    backgroundImage: `url('${this.state.profilePicture.url}')`,
//                    borderRadius: "50%",
//                    height: "100px",
//                    width: "100px",
//                    backgroundSize: "cover",
//                    backroundPosition: "center",
//                    position: "relative",
//                    bottom: "115px",
//                    left: "5vw"
//                   }} /> : 
//                   <ProfilePictureDefault 
//                      user={this.state.loggedInUser}
//                      heightAndWidth="100px"
//                      bottom="115px"
//                      left="5vw"
//                      fontSize="48px"
//                      top="40px"
//                   />
//                   }
//              <div className="edit-profile-picture">
//                <ImageUpload id={2} getProfilePicture={this.getProfilePicture} />
//              </div>

//             <div className="input-container">
//                <label>First Name</label>
//                <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.firstName} type="text" name="firstName"/>
//                <label>Last Name</label>
//                <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.lastName} type="text" name="lastName"/>
//                <label>Location</label>
//                <input onChange={this.onInputChange} placeholder={this.state.loggedInUser.location} type="text" name="location"/>
//                <label>Bio</label>
//                <textarea onChange={this.onInputChange} placeholder={this.state.loggedInUser.bio} type="text" name="bio"/>
//                <label>Choose the sports to follow</label>
//                <SelectionCategories categoryContext={this.context} loggedInUser={this.state.loggedInUser}/>
//             </div>
//         </form>
//       </div>
//     </section>
//     )
//   }
// }

// export default EditProfile

import '../scss/EditProfile.scss'
import React from 'react'
import { Redirect } from 'react-router-dom'
import CategoryContext  from '../../contexts/CategoryContext'
import { EDIT_USER, GET_USER } from '../../api/userAPI'
import ImageUpload from '../Post/ImageUpload'
// import CategoriesOnBoarding from '../Categories/CategoriesOnBoarding'
import SelectionCategories from '../Categories/SelectionCategories'
import ProfilePictureDefault from './ProfilePictureDefault'
import SectionIntroduction from '../SectionIntroduction'

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
      // if(!this.props.loggedInUser){
      //   alert('helllo')
      //   //return <Redirect to="/login"></Redirect>
      //  }
      await this.getUser()
      this.context.cleanSelectedCategoriesIds()
      const userCategoriesIds = this.state.loggedInUser.categories.map(category => category._id)
      this.context.fillSelectedCategoriesIds(userCategoriesIds)
      await this.context.getCategories()
    }
  
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
        window.location.reload();
    }  catch(err){
      alert('err')
          console.log(err)
     }
  };
    
    onInputChange = e => {
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
    if(!this.state.loggedInUser){
    return <p></p> 
    }
   
    return (
      <section>
       <SectionIntroduction title='Edit Profile' saveEditProfile={this.onSubmit}/>
      <div className="edit-profile">
        <form onSubmit={this.onSubmit}>
           {this.state.backgroundPicture ? 
            <div style={{
               backgroundImage: `url('${this.state.backgroundPicture.url}')`,
               height: "60vh",
               backgroundSize: "cover",
               backroundPosition: "center",
               padding: '50px 5vw',
               display: 'flex',
              justifyContent: 'flex-end'
             }}>
             <div className="edit-background-picture">
                   <ImageUpload id={1} getBackgroundPicture={this.getBackgroundPicture}/>
                </div>
             </div> :
              <div style={{
                 backgroundColor: '#737373',
                 height: "60vh",
                 padding: '50px 5vw',
                 display: 'flex',
                 justifyContent: 'flex-end'
                }}>
                <div class="edit-background-picture">
                   <ImageUpload id={1} getBackgroundPicture={this.getBackgroundPicture}/>
                </div>
              </div>
             }
          
            {this.state.profilePicture ? 
              <div style={{ 
                   backgroundImage: `url('${this.state.profilePicture.url}')`,
                   borderRadius: "50%",
                   height: "100px",
                   width: "100px",
                   backgroundSize: "cover",
                   backroundPosition: "center",
                   position: "relative",
                   bottom: "55px",
                   left: "5vw"
                  }} /> : 
                  <ProfilePictureDefault 
                     user={this.state.loggedInUser}
                     heightAndWidth="100px"
                     bottom="55px"
                     left="5vw"
                     fontSize="48px"
                     top="40px"
                  />
                  }
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
            </div>
        </form>
      </div>
    </section>
    )
  }
}

export default EditProfile