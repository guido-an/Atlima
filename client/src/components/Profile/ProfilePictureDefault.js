import React from 'react'

const ProfilePictureDefault = ({ user }) => {
  return (
    <div style={{
      backgroundColor: '#FF7700',
      borderRadius: '50%',
      height: '100px',
      width: '100px',
      position: 'relative',
      bottom: '55px',
      left: '5vw'
    }}
    >
      <div style={{ color: '#fff', fontSize: '48px', position: 'relative', top: '40px', textAlign: 'center', fontWeight: '700' }}>
        <span>{user.firstName[0].toUpperCase()}</span>
        <span>{user.lastName[0].toUpperCase()}</span>
      </div>
    </div>

  )
}

export default ProfilePictureDefault
