import React, { Component } from "react";
import storage from "../../Firebase/index";

class ImageUpload extends Component {
    
 state = {
      image: null,
      url: "",
      progress: 0
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
              this.props.getMediaUrl(url)
              this.setState({ url });
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
            <input type="file" onChange={this.handleUpload} />
          </div>
      </div>
    );
  }
}

export default ImageUpload;