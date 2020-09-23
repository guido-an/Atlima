import React from 'react'
import Cropper from 'react-easy-crop'
import AddIcon from '@material-ui/icons/Add';

class Crop extends React.Component {
    state = {
        image: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 4,
        setCroppedAreaPixels: null,
        file: null,
      }
     
      onCropChange = crop => {
        this.setState({ crop })
      }
     
      onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        this.setState({ setCroppedAreaPixels: [croppedArea, croppedAreaPixels]})
      }

      onUploadImage = () => {
        const data = {event: this.state.file, setCroppedAreaPixels: this.state.setCroppedAreaPixels}
        this.props.handleUpload(data) 
        this.setState({ image: null, file: null })
      }
     
      onZoomChange = zoom => {
        this.setState({ zoom })
      }

      onFileChange = async e => {
          console.log(e)
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file)
    
          this.setState({ image: imageDataUrl, file: file })
        }
      }
     
      render() {
        return (
            <div className="crop">
                 <div>
                    <label htmlFor="newPostInput" className="custom-file-upload">
                        <AddIcon/>
                    </label>
                    <input id="newPostInput" type="file" onChange={this.onFileChange} className="newPostInput" />
                </div>
                <div className={this.state.image ? '' : 'newPostInput'}>
                    <Cropper
                        image={this.state.image}
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                    >
                    </Cropper>
                </div>
                <button className={this.state.image ? 'primary-btn-crop' : 'newPostInput'} onClick={this.onUploadImage} > Crop </button>
            </div>
        )
      } 
}
function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

export default Crop

