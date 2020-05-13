import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const GET_SPORTS = async () => {
  const sports = await service.get('/sport/all')
  return sports.data
}