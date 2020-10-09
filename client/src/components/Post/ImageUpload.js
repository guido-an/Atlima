import '../scss/newPostInput.scss'
import React, { Component } from "react";
import storage from "../../Firebase/index";
import editProfileIcon from '../../images/edit-profile-icon.png'
import ReactPlayer from 'react-player'
import { Carousel } from 'react-responsive-carousel';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Crop from './Crop';
import Spinner from '../../components/Spinner'


class ImageUpload extends Component {
    
 state = {
      image: null,
      url: "",
      progress: 0,
      mediaFiles: [],
    };

  removeMedia = (media) => {
      const updatedArray = this.state.mediaFiles.filter(arrayMedia => {
          return arrayMedia !== media
      })
      this.setState({ mediaFiles: updatedArray });
      
      if (this.state.mediaFiles.length == 1){
        this.setState({ url: "" });
      }
    }

  urlToBlob = async (image,name) =>{
    try{
      const blob = await fetch(image).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type: "image/png" }))
      console.log("blob", blob)
      return blob
     }catch(err){
       console.log(err)
     }
  }
  

  handleUpload = async data => {
    debugger
    if (data.event) {      
      const image = data.croppedImage;
      const name = data.croppedImage.substr(27);
      try{
        const blob = await this.urlToBlob(image, name)
        const uploadTask = storage.ref(`images/${name}`).put(blob);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },
          error => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(name)
              .getDownloadURL()
              .then(url => {
                let file = {}
                file.type = data.event.type
                file.url = url
                if (this.props.id == 1){
                  this.props.getBackgroundPicture && this.props.getBackgroundPicture(file)
                }else if(this.props.id == 2){
                  this.props.getProfilePicture && this.props.getProfilePicture(file)
                }else if(this.props.id == 3){
                  this.props.getMediaFile([...this.state.mediaFiles, file])
                }
                
                this.setState({ 
                  url, mediaFiles: [...this.state.mediaFiles, file]
                });
                console.log("media", this.state.mediaFiles)
              });
          }
        );
      }catch(err){
        console.log(err)
      }
    }else if (data.target.files[0]) {      
      const image = data.target.files[0];
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              let file = {}
              file.type = image.type
              file.url = url
              if (this.props.id == 1){
                this.props.getBackgroundPicture && this.props.getBackgroundPicture(file)
              }else if(this.props.id == 2){
                this.props.getProfilePicture && this.props.getProfilePicture(file)
              }else if(this.props.id == 3){
                this.props.getMediaFile([...this.state.mediaFiles, file])
              }
              this.setState({ 
                url, mediaFiles: [...this.state.mediaFiles, file]
              });
            });
        }
      );
    }

  };


  render() {
    console.log(this.state.mediaFiles)
    if (this.state.progress >= 1 && this.state.progress <= 99){
      return(
        <div className="uploader-spinner">
          <Spinner/>
       </div>
      )
    }
    if (this.props.newPost === true){
      return(
        <div className="newPostUploader">
          <div className={this.state.url != "" ? "margin-left" : "image-base"}>
            <Carousel showArrows={false} showThumbs={false} showIndicators={this.state.mediaFiles && this.state.mediaFiles.length >= 2? true : false } showStatus={false} infiniteLoop={this.state.mediaFiles && this.state.mediaFiles.length >= 2? true : false } dynamicHeight={true} cancelable={false}>
              {this.state.url && this.state.mediaFiles && this.state.mediaFiles.map((media, i) => {
                if (media.type[0] == "v"){
                return (
                  <div>
                    <label onClick={(e) => this.removeMedia(media)} id={media.url} className="custom-file-remove-video">
                      <ClearIcon/>
                    </label>
                    <ReactPlayer
                    key={i}
                    className='react-player'
                    playing={false}
                    loop={true}
                    controls={true}
                    playIcon=""
                    url= {media.url}
                    width='100%'
                    height='100%'
                  />
                </div>
                )}
                else if(media.type[0] == "i" ){
                  return (
                    <div key={i}>
                      <label onClick={(e) => this.removeMedia(media)} className="custom-file-remove">
                          <ClearIcon/>
                        </label>
                      <img key={i} src={media.url} style={{ maxWidth: '100vw', left: '0px' }} />
                    </div>
                  )}
                else{
                  
                }
              })}
            </Carousel>
          </div>
          <Crop handleUpload={this.handleUpload}/>
        </div>
      )
    }    
    return (
          <div>
            <div className="row">
              <progress value={this.state.progress} max="100" className="progress" />
            </div>
              <div>
              <label htmlFor={this.props.id} className="custom-file-upload">
                  <img src={editProfileIcon}/>
              </label>
                <input id={this.props.id} type="file" onChange={this.handleUpload} />
              </div>
                <img
                className="image-upload"
                src={this.state.url}
                alt="Uploaded Images"
                />
          </div>
        );
      }
    
}

export default ImageUpload;