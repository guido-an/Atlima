import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log('checking in private')
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} user={user} {...rest} />
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}
export default ProtectedRoute
