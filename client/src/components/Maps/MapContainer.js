import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GET_POSTS } from '../../api/postAPI'

class MapContainer extends React.Component {

  
  state = { 
    posts: [],
     lat: null,
     lng: null,
     errorMessage: ''
     }
  // centerMoved(mapProps, map){
  //   console.log(mapProps, map, 'test')
  // }



  getSports = async () => {
    try {
      let postsFromDb = await GET_POSTS()
      console.log(postsFromDb, 'postsFromDb')
      this.setState({ posts: postsFromDb })
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount(){
    this.getSports()
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          lat: position.coords.latitude,
          lng: position.coords.longitude 
      })
      },
       err => {
         this.setState({ errorMessage: err.message })
       }
    )
  }

  renderMap(){
    if(this.state.errorMessage){
      return <div>Error message: {this.state.errorMessage}</div>
    } 
    
    if(!this.state.errorMessage && this.state.lat && this.state.lng) {
        return <Map 
        google={this.props.google} 
        zoom={4} onDragend={this.centerMoved}
        initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}>
          {this.state.posts && this.state.posts.map(post => {
            return  <Marker 
            title={'The marker`s title will appear as a tooltip.'}
            key={post._id}  
            position={{lat: post.location.coordinates.lat, lng: post.location.coordinates.lng}} />
          })}
        </Map>
    } 

    return <p>Loading..</p>
  }

  render(){
    return (
      <div> { this.renderMap() }</div>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)

