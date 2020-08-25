import '../scss/UserProfile.scss'
import React from 'react'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';
import AuthContext  from '../../contexts/AuthContext'
import { FOLLOW_USER, GET_USER } from '../../api/userAPI'
// import editPencil from '../../images/edit-pencil.png'
import editPencilWhite from '../../images/edit-pencil-white.png'
import locationIcon from '../../images/location-icon.png'
import locationIconWhite from '../../images/location-icon-white.png'
import settingsIcon from '../../images/settings-icon.png'
import DisplayPosts from '../Post/DisplayPosts'
import ProfilePictureDefault from './ProfilePictureDefault'

class UserProfile extends React.Component {
  static contextType = AuthContext
  
  state = { 
      content: '',
      mediaFile: [],
      pageUser: null,
      pageUserIsFollowed: null,
      whichPostsToShow: 'user-posts',
      redirect: false,
      showLogout: false 
    }
  
    async componentDidMount(){
      try {
       const user =  await this.getUser()
      } catch(err){
        console.log(err)
      }
    }

    async componentDidUpdate(prevProps) {
      if (this.props.profilePageId !== prevProps.profilePageId) {
        await this.getUser()
      }
    }

    checkIfPageUserIsFollowed = () => {
        const user = this.state.pageUser
        if(user && user.followedBy.includes(this.context.loggedInUser._id)){
          this.setState({ pageUserIsFollowed: true })
        } 
      else {
        this.setState({ pageUserIsFollowed: false })
      }
    }

    getUser = async () => {
      try {
       const user = await GET_USER(this.props.profilePageId)
        this.setState({ pageUser: user })
        this.checkIfPageUserIsFollowed()
      } catch(err){
        console.log(err)
      }
    }
    onSubmitHandler = async e => {
      e.preventDefault()
      try {
        await FOLLOW_USER(this.props.profilePageId)
        await this.getUser()
      } catch(err){
        console.log(err)
      }
    }

    switchPostsToShow = (string) => {
      this.setState({ whichPostsToShow: string})
    }


    showLogout = () => {
      this.setState({ showLogout: !this.state.showLogout })
    }

  logoutUser = () =>{
    this.context.logout()
    .then(() => {
      this.context.setUser(null);  
      this.setState({ redirect: true })
    })
    
  }
  

  render () {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }
    const loggedInUser = this.context.loggedInUser
    const pageUser = this.state.pageUser    
  
    if(!pageUser || !loggedInUser) {
      return <p></p>
    }
  
   return (
      <div className="user-profile">
             <div className="edit-profile-icon">
               {this.props.profilePageId === loggedInUser._id ?  
               <Link to={`/profile/edit/${this.props.profilePageId}`}>
                    <img src={editPencilWhite}/> 
                   </Link> :
                  <form onSubmit={this.onSubmitHandler}>
                    {this.state.pageUserIsFollowed ? 
                      <button className='unfollow-btn'>Unfollow</button> :
                      <button className='follow-btn'>Follow</button> 
                      }
                 </form> 
               }
             </div>
             {this.props.profilePageId === loggedInUser._id &&
              <div>
                <div onClick={this.showLogout}>
                  <img className="settings-icon" src={settingsIcon}/>
                </div>
                 {this.state.showLogout && 
                  <div className="logout" >
                    <p onClick={this.logoutUser}>Logout</p>
                  </div>
                 }
              </div>
             }

            

             <div className="user-profile-header">
              {pageUser.backgroundPicture ? 
                <div style={{
                 background:`linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.75) 90%), url('${pageUser.backgroundPicture.url}')`, 
                 height: "60vh",
                 backgroundSize: "cover",
                 backroundPosition: "center"
                }} /> : 
                <div style={{
                 backgroundColor: '#737373',
                 height: "60vh"
                }} />
              }
              {pageUser.profilePicture ? 
              <div style={{ 
                   backgroundImage: `url('${pageUser.profilePicture.url}')`,
                   borderRadius: "50%",
                   height: "100px",
                   width: "100px",
                   backgroundSize: "cover",
                   backroundPosition: "center",
                   position: "relative",
                   bottom: "55px",
                   left: "5vw"
                  }} />  : 
                  <ProfilePictureDefault 
                     user={pageUser}
                     heightAndWidth="100px"
                     bottom="55px"
                     left="5vw"
                     fontSize="48px"
                     top="40px"
                  />
              }
                  <div className="user-info">
                     <h1>{pageUser.firstName} {pageUser.lastName}</h1>
                    {pageUser.location ?  
                        <div className="user-location-info">
                           <img src={locationIconWhite}/>
                           <p className="location">{pageUser.location}</p>
                        </div> :
                        <div className="user-location-info">
                           <div><img src={locationIconWhite}/></div>
                           <p className="location">Around the world</p>
                        </div> 
                    }
                   </div>
                   <div>
                     <p className="followers">Following {pageUser.followedUsers.length} Followers {pageUser.followedBy.length}</p>
                     <p className="bio">{pageUser.bio}</p>
                   </div>
                  
                 {pageUser.categories.length >= 1 && 
                  <div className="sports-section">
                    <h3>SPORTS</h3>
                    <div className="categories">
                         <div className="wrapper-categories">
                          {pageUser.categories.map((category, i) => {
                             return (
                               <div key={i} className='item'>
                                 <label className='container '>
                                   <input type='checkbox' name={category._id} />
                                   <span className="checkmark">{category.name}</span>
                                  </label>
                               </div>
                             )
                           })}
                       </div>
                    </div>
                  </div>}
                  
                 {pageUser.followedSpots.length >= 1 && 
                  <div className="locations">
                     <h3>LOCATIONS</h3>
                     <div className="categories">
                         <div className="wrapper-categories">
                          {pageUser.followedSpots.map((spot, i) => {
                             return (
                               <div key={i} className='item'>
                                 <label className='container '>
                                   <input type='checkbox' name={spot._id} />
                                   <span className="checkmark-location"> <img src={locationIcon}/> <span>{spot.location.terms[0].value}</span></span>
                                  </label>
                               </div>
                             )
                           })}
                       </div>
                    </div>
                  </div>
                  }
              </div>
             
             <div className="divider"/>
                 <div className="posts-header">
                   <h3 onClick={() => this.switchPostsToShow('user-posts')} className={this.state.whichPostsToShow === 'user-posts' ? "border-bottom" : undefined}>
                     POSTS
                  </h3>
                  {pageUser && pageUser.taggedPosts.length >= 1 &&
                    <h3 onClick={() => this.switchPostsToShow('tags-posts')} className={this.state.whichPostsToShow === 'tags-posts' ? "border-bottom" : undefined}>TAGS</h3>
                  }
                 </div>
                {pageUser && 
                  <div className="posts-to-show">
                    {this.state.whichPostsToShow === 'user-posts' &&
                        <DisplayPosts 
                           posts={pageUser.posts.reverse()}
                         />
                      }
                      {this.state.whichPostsToShow === 'tags-posts' &&
                       <DisplayPosts 
                           posts={pageUser.taggedPosts.reverse()}
                         />
                      }
                      {pageUser && pageUser.posts.length === 0 && pageUser._id === this.context.loggedInUser._id &&
                        <div className="create-first-post">
                           <Link to="/create-post"><p>> Create your first Post :)</p></Link>
                        </div>
                      }
                  </div>
                }
           </div>
    )
  }
}

export default UserProfile
