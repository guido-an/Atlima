import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function TimeAgo ({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} className='time-ago' />
    </div>
  )
}
