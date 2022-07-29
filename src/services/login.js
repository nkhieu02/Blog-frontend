import axios from 'axios'
const baseURL = 'api/login'

const login = async (newLogin) => {
    console.log('Logging in')
    const response = await axios.post(baseURL, newLogin)
    return response.data
}

export default { login }