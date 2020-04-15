class FileUpload extends React.Component {
    render() {
      return (
        <div>
          <progress value={this.state.uploadValue} max='100'>
            {this.state.uploadValue} %
          </progress>
          <br />
          <input type='file' onChange={this.handleOnChange.bind(this)}/>
          <br />
          <img width='90' src={this.state.picture} />
        </div>
      )
    }
  }
  