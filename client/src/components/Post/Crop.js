import React from 'react'
import Cropper from 'react-easy-crop'

class Crop extends React.Component {
    state = {
        image: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/99799/s960_30_05_20_GovUK2.jpg',
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 3,
      }
     
      onCropChange = crop => {
        this.setState({ crop })
      }
     
      onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
      }
     
      onZoomChange = zoom => {
        this.setState({ zoom })
      }
     
      render() {
        return (
            <div className="crop primary-btn">
                <Cropper
                    image={this.state.image}
                    crop={this.state.crop}
                    zoom={this.state.zoom}
                    aspect={this.state.aspect}
                    onCropChange={this.onCropChange}
                    onCropComplete={this.onCropComplete}
                    onZoomChange={this.onZoomChange}
                />
            </div>
        )
      } 
}

export default Crop

