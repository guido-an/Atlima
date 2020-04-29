import axios from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export const CREATE_POST = async (content, _id, mediaArray) => {
  await service.post('/post/new', {
    content,
    _id,
    mediaArray
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

export const GET_SINGLE_POST = async userId => {
  const post = await service.get(`/post/${userId}`)
  console.log(post.data, 'post test')
  return post.data
}

export const LIKE_A_POST = async postId => {
  await service.post(`/post/like/${postId}`)
}

export const COMMENT_A_POST = async (postId, content) => {
  await service.post(`/post/${postId}/comment`, { content })
  console.log('commment added')
}
