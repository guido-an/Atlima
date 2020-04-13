import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

// const ProtectedRoute = ({ component: Component, user, ...rest }) => {
//   console.log({ component: Component, user, ...rest }, 'private')
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (user) {
//           return <Component {...props} loggedInUser={user} />
//         } else {
//           return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//         }
//       }}
//     />
//   )
// }

class ProtectedRoute extends React.Component {
  // console.log({ this.props.component: this.props.Component, this.user, ...this.rest }, 'private')

  render () {
    return (
      <Route
        {...this.rest}
        render={props => {
          if (this.user) {
            return <this.Component {...props} loggedInUser={this.user} />
          } else {
            return <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
          }
        }}
      />
    )
  }
}

export default ProtectedRoute
