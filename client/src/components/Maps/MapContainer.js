import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PostContext  from '../../contexts/PostContext'

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
      this.getPosts()
     }

    
    getPosts = async () => {
      try {
        await this.context.getFeedPosts()
      } catch(err) {
        console.log(err)
      }
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
        google={this.props.google} 
        containerStyle={containerStyle}
        style={style}
        zoom={4}
        initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}>
          {this.context.mapsPostCopy && this.context.mapsPostCopy.map((post, index) => {
            if(post.spot){
              return  <Marker 
              onClick={this.onMarkerClick}
              title={'The marker`s title will appear as a tooltip.'}
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
    console.log(this.context.mapsPost)
    return (
      <div>
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

