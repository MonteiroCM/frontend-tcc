import axios from 'axios'
import * as storage from '../storage'

const http = axios.create({
  baseURL: 'http://18.117.219.250:5000/',
})

// eslint-disable-next-line consistent-return
http.interceptors.request.use(async config => {
  try {
    const token = storage.getLocalToken()
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `Bearer ${token}`
    }

    return config
  } catch (error) {
    console.log('api', error)
  }
})

// eslint-disable-next-line import/prefer-default-export
export { http }
