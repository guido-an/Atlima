import React from 'react'
import  { Redirect } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'
import TagUsersBar from '../Post/TagUsersBar'
import '../../components/scss/buttons.scss'
import '../../components/scss/createPost.scss'

import CategoryContext  from '../../contexts/CategoryContext'

import SelectCategoriesPost from '../../components/Categories/SelectCategoriesPost'


class Post extends React.Component {
   static contextType = CategoryContext

  state = { 
      title: '',
      content: '',
      athletes: [],
      mediaFile: [],
      location: null,
      redirect: false
    }

    async componentDidMount(){
      await this.context.cleanSelectedCategoriesIds()
    }
  
  onSubmit = async e => {
    e.preventDefault();
    const taggedUsersIds = this.state.athletes.map(athlete => {
      return athlete._id
    })
    if (this.state.mediaFile.length != [] ){     
        try {
          await this.props.postContext.createPost(
            this.state.title,
            this.state.content,
            this.state.mediaFile,
            this.state.location,
            this.context.selectedCategoriesIds,
            taggedUsersIds
          )
        this.setState({ redirect: true })
      }  catch(err){
            console.log(err)
      }
    }else{
      alert('Please choose an image :)')
    }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

    getMediaFile = file => {
      this.setState({ mediaFile: [...this.state.mediaFile, file]})
    }

    getLocation = spotLocation => {
      this.setState({location: spotLocation})
    }

    getAthletesToTag = athletes => {
      this.setState({ athletes })
    }

  render () {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    
    return (
      <div className="create-post">
        <ImageUpload getMediaFile={this.getMediaFile}/>
        <form onSubmit={this.onSubmit}>        
            <label>Title</label>
            <input onChange={this.onInputChange} type="text" placeholder="Title" name="title"/>
            <label>Description</label>
            <textarea onChange={this.onInputChange} rows="4" type="textarea" placeholder="Description" name="content"/>
            <label>Tag Other Athlets</label>
            <TagUsersBar getAthletesToTag={this.getAthletesToTag}/>
            <label>Location</label>
            <Places getLocation={this.getLocation} />
            <label>Categories</label>
              <SelectCategoriesPost/>
            <button className="primary-btn">Create post</button>
        </form>
      </div>
    )
  }
}

export default Post

