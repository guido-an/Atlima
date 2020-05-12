import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
 
class Component extends React.Component {

    onInputSelect = spotLocation => {
        this.props.getLocation(spotLocation)
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
 
export default Component;
