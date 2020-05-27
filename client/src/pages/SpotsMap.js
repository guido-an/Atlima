import React from 'react'
import MapContainer from '../components/Maps/MapContainer'

import CategoryContext from '../contexts/CategoryContext'


class SpotsMap extends React.Component {
  static contextType = CategoryContext

  render () {
    return (
      <div>
        <MapContainer categoryContext={this.context} />
      </div>
    )
  }
}

export default SpotsMap
