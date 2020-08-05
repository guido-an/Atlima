import '../scss/UserProfile.scss'
import React from 'react'
import {Link} from 'react-router-dom';
import AuthContext  from '../../contexts/AuthContext'
import { FOLLOW_USER, GET_USER } from '../../api/userAPI'
import editPencil from '../../images/edit-pencil.png'
import locationIcon from '../../images/location-icon.png'
import DisplayPosts from '../Post/DisplayPosts'

class UserProfile extends React.Component {
  static contextType = AuthContext
  
  state = { 
      content: '',
      mediaFile: [],
      pageUser: null,
      pageUserIsFollowed: null,
      whichPostsToShow: 'user-posts'
    }
  
    async componentDidMount(){
      try {
       const user =  await this.getUser()
       
      } catch(err){
        console.log(err)
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
        console.log(user, 'user')
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

  render () {
    console.log(this.state.whichPostsToShow, 'whichPostsToShow')
    const loggedInUser = this.context.loggedInUser
    const pageUser = this.state.pageUser
    const backgroundImage = loggedInUser && loggedInUser.backgroundPicture ? loggedInUser.backgroundPicture.url : "https://via.placeholder.com/500"
    const profileImage = loggedInUser && loggedInUser.profilePicture ? loggedInUser.profilePicture.url : "https://vignette.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest?cb=20140126234206"
     
   return (
      <div className="user-profile">
             <div className="edit-profile-icon">
               {(loggedInUser && this.props.profilePageId === loggedInUser._id) ?  
               <Link to={`/profile/edit/${this.props.profilePageId}`}><img src={editPencil} /></Link> :
                  <form onSubmit={this.onSubmitHandler}>
                    {this.state.pageUserIsFollowed ? 
                      <button className='unfollow-btn'>Unfollow</button> :
                      <button className='follow-btn'>Follow</button> 
                      }
                 </form> 
               }
             </div>
             {pageUser && 
             <div className="user-profile-header">
             <div style={{
               backgroundImage: `url('${backgroundImage}')`,
               height: "70vh",
               backgroundSize: "cover",
               backroundPosition: "center"
              }} />
              <div style={{ 
                   backgroundImage: `url('${profileImage}')`,
                   borderRadius: "50%",
                   height: "150px",
                   width: "150px",
                   backgroundSize: "cover",
                   backroundPosition: "center",
                   position: "relative",
                   bottom: "90px",
                   left: "20px"
                  }} /> 
                  <div className="user-info">
                     <h1>{pageUser.firstName} {pageUser.lastName}</h1>
                    {pageUser.location &&  
                        <div className="user-location-info">
                           <img src={locationIcon}/>
                           <p className="location">{pageUser.location}</p>
                        </div>
                    }
                     <p className="followers">Following: {pageUser.followedUsers.length} Followers: {pageUser.followedBy.length}</p>
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
             }
             <div className="divider"/>
                 <div className="posts-header">
                   <h3 onClick={() => this.switchPostsToShow('user-posts')} className={this.state.whichPostsToShow === 'user-posts' && "border-bottom"}>
                     POSTS
                  </h3>
                  {pageUser && pageUser.taggedPosts.length >= 1 &&
                    <h3 onClick={() => this.switchPostsToShow('tags-posts')} className={this.state.whichPostsToShow === 'tags-posts' && "border-bottom"}>TAGS</h3>
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
                      {pageUser && pageUser.posts.length === 0 && 
                        <div className="create-first-post">
                           <Link to="/create-post"><p>Create your first post :)</p></Link>
                        </div>
                      }
                  </div>
                }
           </div>
    )
  }
}

export default UserProfile
