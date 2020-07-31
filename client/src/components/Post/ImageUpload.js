import React, { Component } from "react";
import storage from "../../Firebase/index";
import editProfileIcon from '../../images/edit-profile-icon.png'


class ImageUpload extends Component {
    
 state = {
      image: null,
      url: "",
      progress: 0,
    };

  handleUpload = e => {
    if (e.target.files[0]) {      
      const image = e.target.files[0];
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
              this.props.getProfilePicture && this.props.getProfilePicture(file)
              this.props.getBackgroundPicture && this.props.getBackgroundPicture(file)
              
              this.setState({ 
                url
              });
            });
        }
      );
    }
  };


  render() {
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