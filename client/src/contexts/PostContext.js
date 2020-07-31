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
        mapsMarkers: [],
        mapsPostCopy: [],
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
             mapsPostCopy: mapPosts.data,
             mapsMarkers: mapPosts.data
          })
         return mapPosts.data
        } catch(err){
            console.log(err)
        }
   }

    createPost = async (title, content, mediaFile, location, categories) => {
        console.log(mediaFile, 'media con context')
        try {
            await service.post('/post/new', {
                title,
                content,
                mediaFile,
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
            this.state.mapsMarkers.forEach(post => {
            if(!post.spot) {
               return 
            } else {
                if(post.spot.placeId == areaSpot.place_id || post.spot.location.coordinates.lat >= areaSpot.geometry.bounds.Ya.i && post.spot.location.coordinates.lat <= areaSpot.geometry.bounds.Ya.j && post.spot.location.coordinates.lng >= areaSpot.geometry.bounds.Ua.i && post.spot.location.coordinates.lng <= areaSpot.geometry.bounds.Ua.j){
                    insideSpot.push(post)
                }
            }
        })
        console.log(insideSpot, 'inside spot')
        this.setState({ mapsPost: insideSpot })
     }

    

      filterPostsOnCategory = (stateArrayCopy) => {
         let filteredFeedPosts = []
         const categoriesSelected = this.context.selectedCategoriesIds
          stateArrayCopy.forEach(post => {
            const found = post.categories.some(element => categoriesSelected.includes(element))
            if(found){
             filteredFeedPosts = [...filteredFeedPosts, post]
            }
         }) 
         return filteredFeedPosts
      }

     filterPostsOnCategoryHome = () => {
       const filteredPosts = this.filterPostsOnCategory(this.state.feedPostsCopy)
        this.setState({ feedPosts: filteredPosts })
        if(this.context.selectedCategoriesIds.length == 0){
            this.setState({ feedPosts: this.state.feedPostsCopy })
        }
    }

    filterOnSpotClick = id => {
         const filteredPosts = this.state.mapsMarkers.filter(post => {
          if(post.spot && post.spot.placeId == id){ 
           return post
          }
        })
        this.setState({ mapsPost: filteredPosts })
     }


    filterMarkersOnMap = () => {
        let postsByCategory = []
        const categoriesSelected = this.context.selectedCategoriesIds
        this.state.mapsPostCopy.forEach(post => {
            const found = post.categories.some(element => categoriesSelected.includes(element))
            if(found){
                postsByCategory = [...postsByCategory, post]
            }
         }) 
         this.setState({ 
             mapsMarkers: postsByCategory,
        })
       
        if(categoriesSelected.length === 0) {
            this.setState({ mapsMarkers: this.state.mapsPostCopy})
        }
    }

  render(){
    const { getFeedPosts, getUserPosts, getMapPosts, createPost, likePost, commentPost, getSinglePost, filterOnBoundsSearch, filterOnSpotClick, filterMarkersOnMap, filterPostsOnCategoryHome } = this
      return(
          <Context.Provider 
              value={{ 
                  ...this.state, 
                  getFeedPosts, 
                  getUserPosts,
                  getMapPosts, 
                  createPost, 
                  likePost, 
                  commentPost,
                  getSinglePost,
                  filterOnBoundsSearch,
                  filterOnSpotClick,
                  filterMarkersOnMap,
                  filterPostsOnCategoryHome
                }}>


              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



