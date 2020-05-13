import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const CREATE_POST = async (content, mediaArray, location, sports) => {
  await service.post('/post/new', {
    content,
    mediaArray,
    location,
    sports
  })
}

export const GET_POSTS = async () => {
  const allPosts = await service.get('/post/all')
  return allPosts.data
}

export const DELETE_POST = async postId => {
  await service.post(`/post/delete/${postId}`)
  console.log('post deleted from api')
}

export const GET_USER_POSTS = async userId => {
  const userPosts = await service.get(`/post/user/${userId}`)
  return userPosts.data
}

export const GET_SINGLE_POST = async postId => {
  const post = await service.get(`/post/${postId}`)
  return post.data
}

export const LIKE_A_POST = async postId => {
  await service.post(`/post/like/${postId}`)
}

export const COMMENT_A_POST = async (postId, content) => {
  await service.post(`/post/${postId}/comment`, { content })
}
