import serverPath from './config'
import axios from 'axios'

let request = axios.create({
  baseURL: serverPath,
  headers: {
    'content-type': 'application/json',
    'token': localStorage.getItem('token') || ''
  }
})

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

export default {
  getPublicLetters (params) {
    return request.get('letter/list', params)
  },
  getLetter (params) {
    return request.get('letter/show', params)
  },
  sendLetter (data) {
    return request.post('letter/store', data)
  },
  loginByWeixin (data) {
    return request.post('auth/loginByWeixin', data)
  },
  like (data) {
    return request.post('letter/like/increment', data)
  },
  dislike (data) {
    return request.post('letter/like/decrement', data)
  },
  // 评论
  getComments (params) {
    return request.get('comment/list', params)
  },
  // 评论
  addComment (data) {
    return request.post('comment/store', data)
  },
  // 获取额外信息
  getPrompt (data) {
    return request.get('prompt/show', data)
  }
}
