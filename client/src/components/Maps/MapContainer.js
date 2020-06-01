import '../../components/scss/Map.scss'
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { geocodeByAddress } from 'react-google-places-autocomplete';

import PostContext  from '../../contexts/PostContext'
import Places from '../Maps/Places'
import SpotHeader from './SpotHeader'
import DisplayPosts from '../../components/Post/DisplayPosts'
import iconActive from '../../images/icon-google-maps.png'
import iconNormal from '../../images/icon-google-maps2.png'
//import iconUser from '../../images/icon-user-location.png'

class MapContainer extends React.Component {
  static contextType = PostContext

  state = { 
     lat: null,
     lng: null,
     activeMarker: null,
     errorMessage: '',
     areaCoordinates: null
     }
 
     componentDidMount(){
      this.getUserLocation()
     // this.props.categoryContext.cleanSelectedCategoriesIds()
     // this.props.categoryContext.getCategories()
     }
    
    getPosts = async () => {
       try {
         await this.context.getMapPosts()
       } catch(err) {
         console.log(err)
       }
    }

    getLocation = spotLocation => {
     const description = spotLocation.description ? spotLocation.description : spotLocation.location.description
     const { lat, lng } = spotLocation.coordinates || spotLocation.location.coordinates
      geocodeByAddress(description)
       .then(results => {
         this.setState({ 
           areaCoordinates: results[0]
          })   
          if (this.state.areaCoordinates.geometry.bounds){
            this.context.filterOnBoundsSearch(this.state.areaCoordinates)
          } else{
           this.context.filterOnSpotClick(spotLocation.place_id)
          }
           this.setState({ 
            activeMarker: spotLocation,
            lat,
            lng
           }) 
       })
       .catch(error => console.error(error));
     }
    
      onMarkerClick = props => {
        this.getLocation(props.location)
      }

      onMapClicked = (props) => {
          this.setState({
            activeMarker: null
          })
      };
      
      getUserLocation = () => {
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
    const style = {
      width: '100%',
      height: '100%'
    }    
   
    if(this.state.errorMessage){
      return <div>Error message: {this.state.errorMessage}</div>
    } 

    if(!this.state.errorMessage && this.state.lat && this.state.lng) {
        return <Map 
        onClick={this.onMapClicked}
        onReady={this.getPosts}
        onDragend={this.centerMoved}
        google={this.props.google} 
        style={style}
        zoom={12}
        center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}>
          {this.context.mapsPostCopy && this.context.mapsPostCopy.map((post, index) => {
            if(post.spot){
              return  <Marker 
              onClick={this.onMarkerClick} 
              place_id={post.spot.location.place_id} 
              location={post.spot.location}
              postsNumber={post.spot.posts.length}
              key={index}  
              icon={
                this.state.activeMarker && this.state.activeMarker.place_id == post.spot.location.place_id ? iconActive : iconNormal
                  }
              position={{ lat: post.spot.location.coordinates.lat, lng: post.spot.location.coordinates.lng }} /> 
            }})}
            {/* <Marker   
              icon={iconUser}
              position={{ lat: this.state.lat, lng: this.state.lng  }} />  */}
        </Map>
    } 
    return <p>Loading..</p>
  }

  render(){
    return (
      <div className="map-wrapper">
          <div className="places-container">
            <Places getLocation={this.getLocation} />
          </div>
          <div id="map">
            { this.renderMap() }
          </div>
          <div className="map-feed" >
            {this.state.activeMarker && 
            <div>
               <SpotHeader 
               activeMarker={this.state.activeMarker}
               mapsPost={this.context.mapsPost}
                />
               <DisplayPosts 
               posts={this.context.mapsPost} 
               likePost={this.context.likePost}
               commentPost={this.context.commentPost}
               /> 
            </div>}
        </div>
        </div>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)


