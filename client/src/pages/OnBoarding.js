import React from 'react'
import { GET_SPORTS } from '../api/sportAPI'
import { ADD_SPORTS } from '../api/userAPI'
import AuthContext  from '../contexts/AuthContext'


class OnBoarding extends React.Component {
  static contextType = AuthContext

  state = {
    sports: [],
    selectedSportsIds: []
  }
  async componentDidMount(){
    this.getSports()
 }

getSports = async () => {
  try {
      const sports = await GET_SPORTS()
      this.setState({ sports: sports })
     } 
      catch(err){
        console.log(err)
    }
 }

 onSelect = e => {
  const { name } = e.target;
  if(e.target.checked){
    this.setState({
      selectedSportsIds: [...this.state.selectedSportsIds, name],
    })
  } else {
    this.removeSport(name)
  }
}

removeSport = (name) => {
  let myArray = [...this.state.selectedSportsIds]
    if(myArray.includes(name)){
      const newArray = myArray.filter(sport => {
        return sport !== name
      })
      this.setState({ selectedSportsIds: newArray })
    }
  }

  onSubmit = async e => {
    const userId = this.context.loggedInUser._id
    e.preventDefault();
      try {
        await ADD_SPORTS(this.state.selectedSportsIds)
        this.props.history.push(`/profile/edit/${userId}`)
    }  catch(err){
          console.log(err)
     }
  };


  render () {
    return (
      <div>
        <h1>OnBoarding</h1>
      {this.state.sports.map(sport => {
        return (
          <div key={sport._id}>
          <span>{sport.name}</span>
          <input onChange={this.onSelect} type="checkbox" name={sport._id}/>
        </div>
        )
      })}

      <form onSubmit={this.onSubmit}>
        <button>Next</button>
      </form>
      </div>
    )
  }
}

export default OnBoarding
