import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'


const ProtectedRoute = ({ component: Component, loggedInUser, auth, ...rest  }) => {
  const context = useContext(AuthContext)

  useEffect(() => {
    context.fetchUser()
    console.log(context);
   
  });

  return (
    <Route
      {...rest}
      render={props => {
        if (context.loggedInUser) {
          return <Component {...props} loggedInUser={loggedInUser} />
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      }}
    />
  )
}
// const ProtectedRoute = ({ component: Component, user, ...rest }) => {
//   const myUser = useContext(AuthContext)
//   console.log(myUser, 'protecetdroute')
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (user) {
//           return <Component {...props} loggedInUser={user} />
//         } else {
//           return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         }
//       }}
//     />
//   )
// }

export default ProtectedRoute
