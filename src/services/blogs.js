import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const postData = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const putData = async (updateBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config)
  return response.data
}
const deleteData = async (id) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${id}`, config)
}
export default { getAll, setToken, postData, putData, deleteData }