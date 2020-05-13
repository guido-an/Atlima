import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GET_POSTS } from '../../api/postAPI'


class MapContainer extends React.Component {

  state = { 
    posts: [],
     lat: null,
     lng: null,
     showingInfoWindow: false,
     activeMarker: {},
     selectedSpot: {},
     errorMessage: ''
     }

    
  getSpots = async () => {
    try {
      let postsFromDb = await GET_POSTS()
      this.setState({ posts: postsFromDb })
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

  componentDidMount(){
    this.getSpots()
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
          {this.state.posts && this.state.posts.map(post => {
            return  <Marker 
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            description={post.location.description}  
            key={post._id}  
            position={{ lat: post.location.coordinates.lat, lng: post.location.coordinates.lng }} />

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

  renderPosts(){
     if(this.state.posts){
       return <div>
         {this.state.posts.map(post => {
           return <div key={post._id} >
             <p>{post.content}</p>
           </div>
         })}
       </div>
     }
  }

  render(){
    return (
      <div>
        <div>
        { this.renderMap() }
        </div>
        <div>
        { this.renderPosts() }
        </div>
  
        </div>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)

