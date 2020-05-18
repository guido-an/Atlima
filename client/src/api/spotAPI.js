import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const GET_ALL_SPOTS = async () => {
  const spots = await service.get('/spot/all')
  console.log(spots.data, 'spots.data')
  return spots.data
}

// export const GET_ALL_SPOTS = async () => {
//   const spots = await service.get('/spot/all')
//   console.log(spots.data, 'spots.data')
//   return { spots: spots.data }
// }