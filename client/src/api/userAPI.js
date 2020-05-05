import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const EDIT_USER = async (userId, mediaArray, firstName, lastName, team, country, hometown) => {
  const editUser = await service.post(`/profile/edit/${userId}`, {
    mediaArray,
    firstName,
    lastName,
    team,
    country,
    hometown
  })
  return editUser.data
}

export const ADD_SPORTS = async sports => {
  await service.post('/profile/add-sports', { sports })
  console.log('sports from api', sports)
}
