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
          this.setState({ isFollowingSpot: true })
        } 
      else {
        this.setState({ isFollowingSpot: false })
      }
    }

    handleSubmit = async (e, spotPlaceId) => {
      spotPlaceId = this.props.activeMarker.place_id
        e.preventDefault()
        try {
          await FOLLOW_SPOT(spotPlaceId)
          await this.getSingleSpot()
        } catch (err) {
          console.log(err, "message");
        }
      };


  render () {
console.log(this.state.isFollowingSpot, 'this.state.isFollowingSpot')
    const description = this.props.activeMarker.description ? this.props.activeMarker.description.split(',')[0] : this.props.activeMarker.location.terms[0].value
    return (
      <div className='spot-header-section'>
        <div className='divider' />
        <div className='spot-header-container'>
          <div className='title-spot'>
            <img src={iconActive} alt='icon-active-spot' />
            <h1>{description}</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
              {this.state.isFollowingSpot === true  ?  <button className="unfollow-btn">Unfollow</button> :  <button className="follow-btn">Follow</button>}
          </form>
        </div>
        {this.props.mapsPost ?
            <div className="spot-info">
              <span>{this.state.spot && this.state.spot.followedBy.length} Followers</span>
               <span className="dot"></span>
               <span>{this.props.mapsPost && this.props.mapsPost.length} Posts</span>
            </div> :
            <div>
              <p>no posts</p>
            </div> 
         }
      </div>
    )
  }
}

export default SpotHeader

