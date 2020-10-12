import '../scss/onboarding.scss'
import React from 'react'
import Modal from 'react-modal';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width : '90vw'
  }
};

const inputStyle = {
   border: '1px solid  #D9D9D9',
   boxSizing: 'border-box',
   borderRadius: '4px',
   width: '80vw',
   height: '48px',
   paddingLeft: '10px'
}

const closeIconStyle = {
  position: 'absolute',
  top: '15px',
  right: '10px',
  color: '#FF7700'
}
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class SelectionCategories extends React.Component {

  state = { modalIsOpen: false, newSport: '' }

  changeCheckLabel = (e) => {
    this.props.categoryContext.onSelectCategories(e)
    if(e.currentTarget.checked){
      e.currentTarget.nextSibling.nextSibling.style.fontWeight = '800'  
    } else {
      e.currentTarget.nextSibling.nextSibling.style.fontWeight = '400'  
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }
  
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ errorMessage: null })
  };



  requestNewSport = async e => {
    e.preventDefault()
    try {
        await service.post('/categories/new-sport',
        { newSport: this.state.newSport }
        )
        this.closeModal()
        alert('Thanks for submitting this request.')
    }  catch(err){
          console.log(err)
     }
};
  render () {
    return (
      <div className='category ui secondary fluid three item'>
        <div className='onboarding'>
          {this.props.categoryContext.allCategories.map(category => {
            return (
              <div key={category._id} className='item'>
                <label className='container'>
                  <input
                    onChange={this.changeCheckLabel}
                    type='checkbox'
                    id={category._id} // for styling purposes
                    name={category._id}
                    checked={this.props.categoryContext.selectedCategoriesIds.includes(category._id) && true}
                  />
                  <span className={`checkmark  ${category.name}`} />
                  <label className='cat-name'>{category.name}</label>
                </label>
              </div>
            )
          })}
         
          <div className='item'>
                <label className='container'>
                  <input
                    onClick={this.openModal}
                    type='checkbox'
                  />
                  <span className='request-sport' />
                  <p onClick={this.openModal} className='cat-name'>Request sport</p>
                </label>
            </div>
            
        </div>
        
          <Modal
           isOpen={this.state.modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
           >
           <p><strong>ADD SPORT </strong></p>
           <ClearIcon style={closeIconStyle} onClick={this.closeModal}/>
           <p>If there is a sport you would like to follow that is not present in the current list, add it here and we will work on it! </p>
           <form onSubmit={this.requestNewSport}>
             <input style={inputStyle} onChange={this.handleChange} type="text" name="newSport" placeholder="Sport"></input>
             <button style={{ margin: '20px 0 30px', width: '80vw' }} className="primary-btn">Add new sport</button>
           </form>
          </Modal>
      
      </div>
    )
  }
}

export default SelectionCategories
