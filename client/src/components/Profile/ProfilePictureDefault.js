import React from 'react'

const ProfilePictureDefault = ({ user, heightAndWidth, bottom, left, fontSize, top }) => {
  return (
    <div style={{
      backgroundColor: '#FF7700',
      borderRadius: '50%',
      height: heightAndWidth,
      width: heightAndWidth,
      position: 'relative',
      bottom: bottom,
      left: left
    }}
    >
      <div style={{ color: '#fff', fontSize: fontSize, position: 'relative', top: top, textAlign: 'center', fontWeight: '700' }}>
        <span>{user.firstName[0].toUpperCase()}</span>
        <span>{user.lastName[0].toUpperCase()}</span>
      </div>
    </div>

  )
}

export default ProfilePictureDefault
