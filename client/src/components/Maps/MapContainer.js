import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GET_POSTS } from '../../api/postAPI'

class MapContainer extends React.Component {
  state = { posts: [] }
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
  }

  render(){
    console.log(this.state.posts, 'from map')
    return (
        <Map google={this.props.google} zoom={6} onDragend={this.centerMoved}>
   
          <Marker/>
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
              </div>
          </InfoWindow>
        </Map>
      );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer)

