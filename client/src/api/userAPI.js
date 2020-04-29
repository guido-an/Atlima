import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const EDIT_USER = async (userId, mediaArray, firstName,lastName, team, country, hometown) => {
  const editUser = await service.post(`/profile/edit/${userId}`,{
      mediaArray,
      firstName,
      lastName,
      team,
      country,
      hometown
  })
  console.log('edit user')
  return editUser.data
}

