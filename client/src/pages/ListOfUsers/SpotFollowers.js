import '../../components/scss/general.scss' 
import React from 'react'
import { Redirect, Router } from 'react-router-dom'
import SectionIntroduction from '../../components/SectionIntroduction'
import Avatar from '../../components/Profile/Avatar'
import FollowUserBtn from '../../components/FollowUserBtn'
import { GET_SINGLE_SPOT } from '../../api/spotAPI'


class SpotFollowers extends React.Component {

 state = { spot: null }

 async componentDidMount(){
    const placeId = this.props.match.params.id
    try {
       const spot = await GET_SINGLE_SPOT(placeId)
       this.setState({ spot: spot[0] })
    }
   catch(err) {
      console.log(err)
   }
 }

  render () {
      if(!this.props.user){
          return <Redirect to="/login"/>
      }
      if(!this.state.spot)
      return <p></p>
    return (
      <div>
        <SectionIntroduction title={this.props.title} />
        <div style={{ paddingTop: '80px'}}>
         {this.state.spot.followedBy.map((user, i) => {
             return<div key={i} style={{ margin: '30px 5vw'}}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Avatar user={user}/>  
                  <FollowUserBtn user={user}/>
               </div>
                <div className="divider"/>
             </div>
         })}
        </div>
      </div>
    )
  }
}

export default SpotFollowers
