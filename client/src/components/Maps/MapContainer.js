import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GET_ALL_SPOTS } from '../../api/spotAPI'

class MapContainer extends React.Component {

  state = { 
     spots: [],
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
      this.getSpots()
     }

    
    getSpots = async () => {
        let myPosts = []
      try {
        const allSpots = await GET_ALL_SPOTS()
        // iterating over array posts inside posts
        for(let i = 0; i < allSpots.length; i++) { 
           allSpots[i].posts.forEach(post => myPosts = [...myPosts, post])
        }
         this.setState({ spots: allSpots, posts: myPosts})
      } catch(err) {
        console.log(err)
      }
    }

      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedSpot: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
     
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
      console.log('Spot', this.state.selectedSpot)
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
          {this.state.spots && this.state.spots.map(spot => {
            return  <Marker 
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            description={spot.location.description}  
            key={spot._id}  
            position={{ lat: spot.location.coordinates.lat, lng: spot.location.coordinates.lng }} />

          })}
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
    console.log(this.state.spots, 'TEST')
    return (
      <div>
        <div>
        { this.renderMap() }
        </div>
        <div>
          {this.state.posts && this.state.posts.map(post => {
            return <p key={post._id}>{post.content}</p>
          }) }
        </div>
      
        </div>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)

