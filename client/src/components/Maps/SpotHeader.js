import '../../components/scss/SpotHeader.scss'
import React from 'react'

import iconActive from '../../images/icon-google-maps.png'

class SpotHeader extends React.Component {
  render () {
    console.log(this.props.activeMarker.location.terms[0], 'here!')
    return (
      <div className='spot-header-section'>
        <div className='spot-header-container'>
          <div className='title-spot'>
            <img src={iconActive} alt='icon-active-spot' />
            <h1>{this.props.activeMarker && this.props.activeMarker.location.terms[0].value}</h1>
          </div>
          <div>
            <button>Follow</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SpotHeader
