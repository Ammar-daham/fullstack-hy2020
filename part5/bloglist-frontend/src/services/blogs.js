import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null
let config = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

console.log('token before create: ', token)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewBlog = async (newBlog) => {
  console.log('token in create: ', token)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const response = await axios.put(baseUrl + updatedBlog.id, updatedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(baseUrl + id, config)
  return response
}

export default { getAll, createNewBlog, setToken, updateBlog, deleteBlog }
