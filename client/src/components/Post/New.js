import React from 'react'
import  { Redirect } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'
import '../../components/scss/buttons.scss'
import '../../components/scss/createPost.scss'

import CategoryContext  from '../../contexts/CategoryContext'

import SelectCategoriesPost from '../../components/Categories/SelectCategoriesPost'


class Post extends React.Component {
   static contextType = CategoryContext

  state = { 
      title: '',
      content: '',
      mediaFile: [],
      location: null,
      redirect: false
    }

    async componentDidMount(){
      await this.context.cleanSelectedCategoriesIds()
    }
  
  onSubmit = async e => {
    e.preventDefault();
      try {
        await this.props.postContext.createPost(
          this.state.title,
          this.state.content,
          this.state.mediaFile,
          this.state.location,
          this.context.selectedCategoriesIds
        )
      this.setState({ redirect: true })
      // this.props.history.push('/')
 
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


    getMediaFile = file => {
      this.setState({ mediaFile: [...this.state.mediaFile, file]})
    }

    getLocation = spotLocation => {
      this.setState({location: spotLocation})
    }

  render () {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    console.log('midia' , this.state.mediaFile)
    return (
      <div className="create-post">
        <ImageUpload getMediaFile={this.getMediaFile}/>
        <form onSubmit={this.onSubmit}>        
            <label>Title</label>
            <input onChange={this.onInputChange} type="text" placeholder="title" name="title"/>
            <label>Description</label>
            <textarea onChange={this.onInputChange} rows="4" type="textarea" placeholder="description" name="content"/>
            <label>Tag Other Athlets</label>
            <input onChange={this.onInputChange} type="text" placeholder="Users" name="content"/>
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

