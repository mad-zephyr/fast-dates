import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gm.test(config.url)
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const transformData = (data) => (
  data
  ? Object.keys(data).map(key => ({
      ...data[key]
    }))
  : []
)

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) }
    }
    return res
  },
  (error) => {
    const expectedErrors = error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      toast.error('🦄 Unexpected Error', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}
export default httpService
