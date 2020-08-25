// import React from 'react'

// const ProfilePictureDefault = ({ user, height, width }) => {
//   return (
//     <div style={{
//       backgroundColor: '#FF7700',
//       borderRadius: '50%',
//       height: '100px',
//       width: '100px',
//       position: 'relative',
//       bottom: '55px',
//       left: '5vw'
//     }}
//     >
//       <div style={{ color: '#fff', fontSize: '48px', position: 'relative', top: '40px', textAlign: 'center', fontWeight: '700' }}>
//         <span>{user.firstName[0].toUpperCase()}</span>
//         <span>{user.lastName[0].toUpperCase()}</span>
//       </div>
//     </div>

//   )
// }

// export default ProfilePictureDefault
import React from 'react'

const ProfilePictureDefault = ({ user, heightAndWidth, bottom, left, fontSize, top }) => {
  console.log(bottom, left, heightAndWidth)
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
