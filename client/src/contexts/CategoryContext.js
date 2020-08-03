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
        console.log('cats', userCategories)
        /* this.setState({ selecteduserCategoriesIds: [] }) */
        
       /*  if(userCategories != []){     
          const categoriesIds = userCategories.map(category => category._id)
          this.setState({ selectedCategoriesIds: categoriesIds, myFeed: true })
        }  */
             
          const categoriesIds = userCategories.map(category => category._id)
          this.setState({ selectedCategoriesIds: categoriesIds, myFeedActive: true })
          console.log(categoriesIds, 'user categoriues')
         
        
      }

      cleanSelectedCategoriesIds = () => {
        // not worrking for the feed
        this.setState({ selectedCategoriesIds: [] })
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
            }  catch(err){
                  console.log(err)
             }
          };

          fillSelectedCategoriesIds = (array) => {
              this.setState({ selectedCategoriesIds: [...this.state.selectedCategoriesIds, ...array]})
          }

  render(){
    console.log(this.state.selectedCategoriesIds, 'selectedCategoriesIds')
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



