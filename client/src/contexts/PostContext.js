import React from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'

const Context = React.createContext()

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export class PostContext extends React.Component {
    static contextType = AuthContext
   
    state = {
        feedPosts: [],
        userPosts: [],
        mapsPost: [],
        mapsPostCopy: []
      };

      getFeedPosts = async () => {
           try {
            const feedPosts = await service.get('/post/all')
            console.log(feedPosts.data)
            this.setState({ 
                feedPosts: feedPosts.data, 
                mapsPost: feedPosts.data,
                mapsPostCopy: feedPosts.data
             })
            return feedPosts.data
           } catch(err){
               console.log(err)
           }
      }

      getUserPosts = async userId => {
        try {
            const userPosts = await service.get(`/post/user/${userId}`)
            this.setState({ userPosts: userPosts.data })
        }
        catch(err){
            console.log(err)
        }
    }
      
    createPost = async (content, mediaArray, location, categories) => {

        try {
            await service.post('/post/new', {
                content,
                mediaArray,
                location,
                categories
              })
        } catch(err){
            console.log(err)
        }
    }

      likePost = async postId => {
        try {
            await service.post(`/post/like/${postId}`)
        } catch(err){
            console.log(err)
        }
       }

       commentPost = async (postId, content) => {
        try {
            await service.post(`/post/${postId}/comment`, { content })
        } catch(err){
            console.log(err)
      }
    }
  
    getSinglePost = async postId => {
        try {
            const post = await service.get(`/post/${postId}`)
            return post.data
        } catch(err){
            console.log(err)
        }
    }

    filterOnMarkerClick = id => {
        console.log(id)
        const filteredPosts = this.state.mapsPostCopy.filter(post => {
          if(post.spot && post.spot.placeId == id){ 
           return post
          }
        })
        this.setState({ mapsPost: filteredPosts })
        // return filteredPosts
     }

  render(){
    const { feedPosts, userPosts, mapsPost, mapsPostCopy } = this.state
    const { getFeedPosts, getUserPosts, createPost, likePost, commentPost, getSinglePost, filterOnMarkerClick } = this
      return(
          <Context.Provider 
              value={{ 
                  ...this.state, 
                  feedPosts, 
                  userPosts, 
                  mapsPost,
                  mapsPostCopy,
                  getFeedPosts, 
                  getUserPosts, 
                  createPost, 
                  likePost, 
                  commentPost,
                  getSinglePost,
                  filterOnMarkerClick  }}>

              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



