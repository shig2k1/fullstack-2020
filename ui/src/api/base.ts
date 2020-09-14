import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

import config from '../config'

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

class BaseApi {
  axios: AxiosInstance
  constructor () {
    this.axios = axios.create(defaultOptions)
  }

  async get (url: string) {
    try {
      const response = await this.axios
        .get(`${config.api.player}/${url}`)

      console.log('response', response)
      return response.data
    } catch (err) {
      return null
    }
  }

  async post (url: string, data: any) {
    try {
      const response = await this.axios
        .post(`${config.api.player}/${url}`, data)

      console.log('response', response)
      return response.data
    } catch (err) {
      return null
    }
  }

  async sGet (url: string) {
    try {
      // add interceptor for adding user oauth token header
      this.axios.interceptors.request.use(function (config) {
        const token = Cookies.get('token')
        config.headers.auth = token ?? '' // token ? `Bearer ${token}` : ''
        return config
      })

      const response = await this.axios
        .get(`${config.api.player}/${url}`)

      if (!response) return
      const { token } = response.headers
      console.log('t', token)
      Cookies.set('token', token)

      console.log('response', response)
      return response.data
    } catch (err) {
      return null
    }
  }
}

export default BaseApi
