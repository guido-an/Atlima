import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const GET_CATEGORIES = async () => {
  const categories = await service.get('/categories/all')
  return categories.data
}