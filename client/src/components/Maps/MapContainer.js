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
     posts: [],
     lat: null,
     lng: null,
     showingInfoWindow: false,
     activeMarker: null,
     selectedSpot: {},
     errorMessage: '',
     areaCoordinates: null
     }

     componentDidMount(){
      this.getUserLocation()
      this.props.categoryContext.cleanSelectedCategoriesIds()
      this.props.categoryContext.getCategories()
     }

    
    getPosts = async () => {
       try {
         await this.context.getMapPosts()
       } catch(err) {
         console.log(err)
       }
    }

    
    getLocation = spotLocation => {
       geocodeByAddress(spotLocation.description)
        .then(results => {
          this.setState({ 
            areaCoordinates: results[0]
           })   
           if (this.state.areaCoordinates.geometry.bounds){
            this.context.filterOnBoundsSearch(this.state.areaCoordinates)
           }else{
            this.context.filterOnMarkerClick(spotLocation.place_id)
           }
           const { lat, lng } = spotLocation.coordinates
          this.setState({ 
            selectedSpot: spotLocation,
            lat,
            lng
           })      
        })
        .catch(error => console.error(error));
      }
  
    onMarkerClick = (props, marker, e) => {
      console.log(props, marker, 'marker click')
        this.context.filterOnMarkerClick(props.placeId)
        this.setState({
          selectedSpot: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
     
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          // display all the posts again on map click 
          this.context.resetMapsFeed()
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
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

    if(!this.state.errorMessage && this.state.lat && this.state.lng && this.state.selectedSpot) {
        return <Map 
        onClick={this.onMapClicked}
        onReady={this.getPosts}
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
              placeId={post.spot.location.place_id} 
              location={post.spot.location}
              key={index}  
              icon={
                this.state.activeMarker && this.state.activeMarker.placeId == post.spot.location.place_id ? iconActive : iconNormal
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
 //sconsole.log('active marker', this.state.activeMarker )
   // console.log('selected active marker', this.state.activeMarker )
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
             <SpotHeader activeMarker={this.state.activeMarker}/>
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

