import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const EDIT_USER = async (userId, backgroundPicture, profilePicture, firstName, lastName, location, bio) => {
  const editUser = await service.post(`/profile/edit/${userId}`, {
    backgroundPicture,
    profilePicture,
    firstName,
    lastName,
    location,
    bio
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

export const FOLLOW_USER = async userId => {
  await service.post(`/profile/follow/${userId}`)
}

export const GET_USER = async pageUserId => {
  const user = await service.get(`/profile/user/${pageUserId}`)
  return user.data
}
