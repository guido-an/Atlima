import React from 'react'
import axios from 'axios'

import { ADD_CATEGORIES } from '../api/userAPI'

const Context = React.createContext()

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

export class CategoryContext extends React.Component {
    state = { 
        allCategories: [],
        selectedCategoriesIds: []
    };

    getCategories = async () => {
        try {
         const categoriesFromDb = await service.get('/categories/all')
         this.setState({ allCategories: categoriesFromDb.data })
        } catch(err){
            console.log(err)
        }
     }

    
     onSelectCategories = e => {
        const { name } = e.target;
        if(e.target.checked){
          this.setState({
            selectedCategoriesIds: [...this.state.selectedCategoriesIds, name],
          })
          
        } else {
          this.removeUserCategory(name)
        }
      }

      cleanSelectedCategoriesIds = () => {
        this.setState({ selectedCategoriesIds: [] })
      }

      removeUserCategory = (name) => {
        let myArray = [...this.state.selectedCategoriesIds]
          if(myArray.includes(name)){
            const newArray = myArray.filter(category => {
              return category !== name
            })
            this.setState({ selectedCategoriesIds: newArray })
          }
        }

        
        onSubmitUserCategories = async e => {
            //const userId = this.context.loggedInUser._id
            e.preventDefault();
              try {
                await ADD_CATEGORIES(this.state.selectedCategoriesIds)
                // this.props.history.push(`/profile/edit/${userId}`)
            }  catch(err){
                  console.log(err)
             }
          };


  render(){
      const { getCategories, onSelectCategories, removeUserCategory, onSubmitUserCategories, cleanSelectedCategoriesIds } = this
      return(
          <Context.Provider 
              value={{ 
                  ...this.state,
                  getCategories,
                  onSelectCategories,
                  removeUserCategory,
                  onSubmitUserCategories,
                  cleanSelectedCategoriesIds
                   }}>
              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



