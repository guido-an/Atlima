import '../components/scss/Notifications.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { GET_NOTIFICATIONS } from '../api/userAPI'
import TimeAgo from '../components/TimeAgo'

class Notifications extends React.Component {
  static contextType = AuthContext

  state = { notifications: [] }

  async componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount() {
    this.context.resetUnreadNotifications(this.context.loggedInUser._id)
  }

  getNotifications = async userId => {
    userId = this.context.loggedInUser._id
    try {
      const notifications = await GET_NOTIFICATIONS(userId)
      this.setState({ notifications })
    } catch(err){
      console.log(err)
    }
  }

  render () {
    return (
      <div className="notifications-section">
        <h1>Notifications</h1>
        {this.state.notifications.map((notification, i) => {
          return <div key={i}>
            <div className="container">
              <div>
                <div className="text">
                   <span className="orange-dot"></span>
                   <Link to={notification.postUrl}>
                     <p><strong>{notification.name}</strong> {notification.action}  </p>
                   </Link>
                 </div>
                 <TimeAgo date={notification.date} />
              </div>
              <p>image</p>
            </div>
          </div>
        })}
      </div>
    )
  }
}

export default Notifications
