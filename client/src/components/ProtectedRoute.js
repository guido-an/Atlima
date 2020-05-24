import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
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
