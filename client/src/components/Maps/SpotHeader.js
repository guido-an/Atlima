import '../../components/scss/SpotHeader.scss'
import React from 'react'
import { FOLLOW_SPOT, GET_SINGLE_SPOT } from '../../api/spotAPI'
import iconActive from '../../images/icon-google-maps.png'
import AuthContext from '../../contexts/AuthContext'

class SpotHeader extends React.Component {
  static contextType = AuthContext

  state = { spot: null, isFollowingSpot: null }
  
    async componentDidMount(){
      await this.getSingleSpot()
    }

    async componentDidUpdate(prevProps) {
      if (prevProps.activeMarker.place_id  !== this.props.activeMarker.place_id) {
        await this.getSingleSpot()
      }
    }
     
    getSingleSpot = async () => {
      const locationId = this.props.activeMarker.place_id
         try {
          const mySpot = await GET_SINGLE_SPOT(locationId)
          this.setState({ spot: mySpot[0] })
          this.checkIfAlreadyFollowing()
         } catch(err) {
          console.log(err)
         }
    }
  
    checkIfAlreadyFollowing = () => {
      const spot = this.state.spot
        if(spot && spot.followedBy.includes(this.context.loggedInUser._id)){
          console.log('following')
          this.setState({ isFollowingSpot: true })
        } 
      else {
        console.log('not following')
        this.setState({ isFollowingSpot: false })
      }
    }

    followSpot = async (e, spotPlaceId, location) => {
      spotPlaceId = this.props.activeMarker.place_id
      location = this.props.activeMarker
        e.preventDefault()
        try {
          await FOLLOW_SPOT(spotPlaceId, location)
          await this.getSingleSpot()
        } catch (err) {
          console.log(err, "message");
        }
      };

  render () {
    const description = this.props.activeMarker.description ? this.props.activeMarker.description.split(',')[0] : this.props.activeMarker.location.terms[0].value
    return (
       <div className='spot-header-section'>
        <div className='divider' />
        <div className='spot-header-container'>
            <h1>{description}</h1>
          <form onSubmit={this.followSpot}>
              {this.state.isFollowingSpot === true  ?  <button className="unfollow-btn">Unfollow</button> :  <button className="follow-btn">Follow</button>}
          </form> 
        </div>
            <div className="spot-info">
              <span>{this.state.spot && this.state.spot.followedBy.length || 0 } Followers</span>
               <span className="dot"></span>
               <span>{this.state.spot && this.state.spot.posts.length} Posts</span>
            </div> 
      </div>
    )
  }
}

export default SpotHeader

