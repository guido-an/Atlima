import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const GET_ALL_SPOTS = async () => {
  const spots = await service.get('/spot/all')
  return spots.data
}

export const GET_SINGLE_SPOT = async (spotId) => {
  const spot = await service.get(`/spot/${spotId}`)
  return spot.data
}

export const FOLLOW_SPOT = async (spotPlaceId, location) => {
  await service.post('/spot/follow', {
    spotPlaceId,
    location
  })
}

// export const CREATE_SPOT = async (spotPlaceId, location) => {
//   await service.post('/spot/create', {
//     spotPlaceId,
//     location
//   })
// }
