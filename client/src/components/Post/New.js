import React from 'react'
import  { Redirect } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'

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
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="title" name="title"/>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <Places getLocation={this.getLocation} />
              <SelectCategoriesPost/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaFile={this.getMediaFile}/>
      </div>
    )
  }
}

export default Post

