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
        selectedCategoriesIds: [],
        myFeedActive: false
    };

    getCategories = async () => {
        try {
         const categoriesFromDb = await service.get('/categories/all')
         this.setState({ allCategories: categoriesFromDb.data })
        } catch(err){
            console.log(err)
        }
     }

      onMyFeedCategories = userCategories => {      
          const categoriesIds = userCategories.map(category => category._id) 
          this.setState({ selectedCategoriesIds: categoriesIds, myFeedActive: true })   
      }

      cleanSelectedCategoriesIds = () => {
        this.setState({ selectedCategoriesIds: [], myFeedActive: false })
        // TO BE CHANGED - PATCH
        // if (this.state.selectedCategoriesIds != []){ 
        //   this.state.selectedCategoriesIds = []
        //   console.log("entro a la cerdada", this.state.myFeedActive)
        // }
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
            e.preventDefault();
              try {
                await ADD_CATEGORIES(this.state.selectedCategoriesIds)
                window.location.reload()
            }  catch(err){
                  console.log(err)
             }
        };

        requestNewSport = async newSport => {
          try {
              await service.post(newSport)
          }  catch(err){
                console.log(err)
           }
      };

          fillSelectedCategoriesIds = (array) => {
              this.setState({ selectedCategoriesIds: [...this.state.selectedCategoriesIds, ...array]})
          }

  render(){
      const { getCategories, onSelectCategories, removeUserCategory, onSubmitUserCategories, cleanSelectedCategoriesIds, onMyFeedCategories, fillSelectedCategoriesIds } = this
      return(
          <Context.Provider 
              value={{ 
                  ...this.state,
                  getCategories,
                  onSelectCategories,
                  removeUserCategory,
                  onSubmitUserCategories,
                  cleanSelectedCategoriesIds,
                  onMyFeedCategories,
                  fillSelectedCategoriesIds
                  }}>
              {this.props.children}
          </Context.Provider>
      )
  }
}

export default Context



