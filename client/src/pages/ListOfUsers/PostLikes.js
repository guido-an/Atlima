import '../../components/scss/general.scss' 
import React from 'react'
import { Link } from 'react-router-dom'
import SectionIntroduction from '../../components/SectionIntroduction'
import Avatar from '../../components/Profile/Avatar'
import FollowUserBtn from '../../components/FollowUserBtn'
import ProfilePictureDefault from '../../components/Profile/ProfilePictureDefault'
import PostContext from '../../contexts/PostContext'

class PostLikes extends React.Component {
 static contextType = PostContext

 state = { post: null }

 async componentDidMount(){
    const postId = this.props.match.params.id
    try {
       const post = await this.context.getSinglePost(postId)
       this.setState({ post })
    }
   catch(err) {
      console.log(err)
   }
 }

  render () {
    console.log(this.state.post)
      if(!this.state.post)
      return <p></p>
    return (
      <div>
        <SectionIntroduction title={this.props.title} />
        <div style={{ paddingTop: '80px'}}>
         {this.state.post.likes.map((user, i) => {
             return<div key={i} style={{ margin: '30px 5vw'}}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Avatar user={user}/>  
                  <FollowUserBtn user={user}/>
               </div>
                <div className="divider"/>
             </div>
           
         })}
        </div>
      </div>
    )
  }
}

export default PostLikes
