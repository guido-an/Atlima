import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const EDIT_USER = async (userId, mediaFile, firstName, lastName, team, country, hometown) => {
  const editUser = await service.post(`/profile/edit/${userId}`, {
    mediaFile,
    firstName,
    lastName,
    team,
    country,
    hometown
  })
  return editUser.data
}

export const ADD_CATEGORIES = async categories => {
  await service.post('/profile/add-categories', { categories })
}

export const GET_NOTIFICATIONS = async userId => {
  const notifications = await service.get(`/profile/notifications/${userId}`)
  return notifications.data
}
