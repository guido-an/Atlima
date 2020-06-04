import React from 'react'
import { Link } from 'react-router-dom'
const NoPostsOnMap = ({ activeMarker }) => {
  const description = activeMarker.description ? activeMarker.description.split(',')[0] : activeMarker.location.terms[0].value

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <p style={{ fontSize: '18px', color: '#737373' }}>
          There are no posts here just yet
      </p><br />
      <p style={{ fontSize: '18px', color: '#737373', position: 'relative', bottom: '30px' }}>
          Be the first to tell the world about {description}
      </p>
      <Link to='/create-post'>
         Create a post
      </Link>
    </div>
  )
}

export default NoPostsOnMap
