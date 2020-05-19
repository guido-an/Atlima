import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {GoogleApiWrapper} from 'google-maps-react';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
 
class PlacesAutocomplete extends React.Component {

    onInputSelect = spotLocation => {
        
        geocodeByAddress(spotLocation.description)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          spotLocation.coordinates = { lat, lng } 
          this.props.getLocation(spotLocation)
        })
    }

    
  render(){
      return(
        <div>
        <GooglePlacesAutocomplete
          onSelect={this.onInputSelect}
          placeholder='Spot location...'
        />
      </div>
      )
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(PlacesAutocomplete)
