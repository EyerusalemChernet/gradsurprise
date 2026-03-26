/**
 * api.js
 * Axios wrapper for the FastAPI backend.
 */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL })

// Attach JWT token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const sendMessage = (sender_name, content) =>
  api.post('/messages', { sender_name, content })

export const getMessages = () => api.get('/messages')

export const adminLogin = (username, password) => {
  const form = new URLSearchParams()
  form.append('username', username)
  form.append('password', password)
  return api.post('/admin/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export const adminGetMessages = () => api.get('/admin/messages')

export const adminReply = (message_id, reply) =>
  api.post('/admin/reply', { message_id, reply })

export default api
