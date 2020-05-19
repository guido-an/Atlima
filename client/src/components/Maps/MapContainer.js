import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import PostContext  from '../../contexts/PostContext'


import Places from '../Maps/Places'
import DisplayPosts from '../../components/Post/DisplayPosts'

class MapContainer extends React.Component {
  static contextType = PostContext

  state = { 
     posts: [],
     lat: null,
     lng: null,
     showingInfoWindow: false,
     activeMarker: {},
     selectedSpot: {},
     errorMessage: ''
     }


     componentDidMount(){
      this.getUserLocation()
     }

    
    getPosts = async () => {
       try {
         await this.context.getMapPosts()
       } catch(err) {
         console.log(err)
       }
    }

    
    getLocation = spotLocation => {
       this.context.filterOnMarkerClick(spotLocation.place_id)
       const { lat, lng } = spotLocation.coordinates
          this.setState({ 
            selectedSpot: spotLocation,
            lat,
            lng
           })        
      }
  
    onMarkerClick = (props, marker, e) => {
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
          this.context.mapsPost = this.context.mapsPostCopy
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
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
    const containerStyle = {
      position: 'relative',  
      width: '100%',
      height: '300px'
    }

    if(this.state.errorMessage){
      return <div>Error message: {this.state.errorMessage}</div>
    } 

    if(!this.state.errorMessage && this.state.lat && this.state.lng && this.state.selectedSpot) {
        return <Map 
        onClick={this.onMapClicked}
        onReady={this.getPosts}
        google={this.props.google} 
        containerStyle={containerStyle}
        style={style}
        zoom={4}
        center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}>
          {this.context.mapsPostCopy && this.context.mapsPostCopy.map((post, index) => {
            if(post.spot){
              return  <Marker 
              onClick={this.onMarkerClick}
              description={post.spot.location.description}  
              placeId={post.spot.location.place_id} 
              key={index}  
              position={{ lat: post.spot.location.coordinates.lat, lng: post.spot.location.coordinates.lng }} /> 
            }})}
             <InfoWindow
             marker={this.state.activeMarker}
             visible={this.state.showingInfoWindow}>
               <div>
                 <h1>{this.state.selectedSpot.description}</h1>
               </div>
           </InfoWindow>
        </Map>
    } 

    return <p>Loading..</p>
  }

  render(){
    console.log(this.state.selectedSpot, 'this.state.selectedSpot')
    return (
      <div>
      <Places getLocation={this.getLocation} />
        <div>
        { this.renderMap() }
        </div>
        <DisplayPosts 
           posts={this.context.mapsPost} 
           likePost={this.context.likePost}
           commentPost={this.context.commentPost}
        />
      
        </div>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)

