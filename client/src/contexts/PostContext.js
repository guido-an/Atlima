import React from 'react'
import axios from 'axios'
import CategoryContext from './CategoryContext'

const Context = React.createContext()

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export class PostContext extends React.Component {
    static contextType = CategoryContext
   
    state = {
        feedPosts: [],
        feedPostsCopy: [],
        userPosts: [],
        mapsPost: [],
        mapsPostCopy: []
      };

      getFeedPosts = async () => {
           try {
            const feedPosts = await service.get('/post/all')
            this.setState({ feedPosts: feedPosts.data, feedPostsCopy: feedPosts.data })
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

    getMapPosts = async () => {
        try {
         const mapPosts = await service.get('/post/all/spot')
         this.setState({ 
             mapsPost: mapPosts.data,
             mapsPostCopy: mapPosts.data
          })
         return mapPosts.data
        } catch(err){
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

    filterOnBoundsSearch = areaSpot => {
            let insideSpot = [] 
            this.state.mapsPostCopy.forEach(post => {
            if(post.spot.placeId == areaSpot.place_id || post.spot.location.coordinates.lat >= areaSpot.geometry.bounds.Ya.g && post.spot.location.coordinates.lat <= areaSpot.geometry.bounds.Ya.i && post.spot.location.coordinates.lng >= areaSpot.geometry.bounds.Ta.g && post.spot.location.coordinates.lng <= areaSpot.geometry.bounds.Ta.i){
                insideSpot.push(post)
            }
            
        })
        this.setState({ mapsPost: insideSpot })
     }

     filterOnMarkerClick = id => {
        const filteredPosts = this.state.mapsPostCopy.filter(post => {
          if(post.spot && post.spot.placeId == id){ 
           return post
          }
        })
        this.setState({ mapsPost: filteredPosts })
     }
   
     filterPostsOnCategory = categoriesSelected => {
        let filteredFeedPosts = []
        categoriesSelected = this.context.selectedCategoriesIds
       this.state.feedPostsCopy.forEach(post => {
           const found = post.categories.some(element => categoriesSelected.includes(element))
           if(found){
            filteredFeedPosts = [...filteredFeedPosts, post]
           }
        }) 
        this.setState({ feedPosts: filteredFeedPosts })

        if(categoriesSelected.length == 0){
            this.setState({ feedPosts: this.state.feedPostsCopy })
        }
    }

     resetMapsFeed = async => {
        this.setState({ mapsPost: this.state.mapsPostCopy })
    }

  render(){
    const { feedPosts, userPosts, mapsPost, mapsPostCopy } = this.state
    const { getFeedPosts, getUserPosts, getMapPosts, createPost, likePost, commentPost, getSinglePost, filterOnBoundsSearch, filterOnMarkerClick, filterMapCategories, resetMapsFeed, filterPostsOnCategory } = this
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
                  getMapPosts, 
                  createPost, 
                  likePost, 
                  commentPost,
                  getSinglePost,
                  filterOnBoundsSearch,
                  filterOnMarkerClick,
                  filterMapCategories,
                  resetMapsFeed,
                  filterPostsOnCategory
                }}>


              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



