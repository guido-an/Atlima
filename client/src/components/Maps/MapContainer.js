import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

 
class MapContainer extends React.Component {

  centerMoved(mapProps, map){
    console.log(mapProps, map, 'test')
  }

  render(){
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
