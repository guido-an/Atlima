import React from 'react'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'
import { CREATE_POST } from '../../api/postAPI'
import { GET_SPORTS } from '../../api/sportAPI'

class Post extends React.Component {
  
  state = { 
      content: '',
      mediaArray: [],
      location: null,
      sports: [],
      selectedSportsIds: []
    }

    getSports = async () => {
      try{
        const sportsFromDb = await GET_SPORTS()
        this.setState({ sports: sportsFromDb })
      } catch(err) {
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

    componentDidMount(){
      this.getSports()
    }
  
  onSubmit = async e => {
    e.preventDefault();
    
      try {
      await CREATE_POST(
        this.state.content,
        this.state.mediaArray,
        this.state.location,
        this.state.selectedSportsIds
      )
      this.props.history.push('/')
    }  catch(err){
          console.log(err)
     }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }


    getMediaArray = url => {
      this.setState({ mediaArray: [...this.state.mediaArray, url]})
    }

    getLocation = spotLocation => {
      this.setState({location: spotLocation})
    }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <Places getLocation={this.getLocation}/>
            {this.state.sports.map(sport => {
                 return (
                   <div key={sport._id}>
                   <span>{sport.name}</span>
                   <input onChange={this.onSelect} type="checkbox" name={sport._id}/>
                 </div>
                 )
               })}
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

