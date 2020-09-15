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

  setToken (token: string) {
    const dt = new Date()
    dt.setHours(dt.getHours() + 1)
    Cookies.set('token', token, { expires: dt })
  }

  setSecureTokenHeader () {
    // add interceptor for adding user oauth token header
    this.axios.interceptors.request.use(function (config) {
      const token = Cookies.get('token')
      config.headers.auth = token ?? '' // token ? `Bearer ${token}` : ''
      return config
    })
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

  async sGet (url: string) {
    try {
      this.setSecureTokenHeader()
      const response = await this.axios
        .get(`${config.api.player}/${url}`)
      // no response  - return
      if (!response) return
      const { token } = response.headers
      this.setToken(token)
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

  async sPost (url: string, data: any) {
    try {
      this.setSecureTokenHeader()
      const response = await this.axios
        .post(`${config.api.player}/${url}`, data)
      // no response  - return
      if (!response) return
      const { token } = response.headers
      this.setToken(token)
      return response.data
    } catch (err) {
      return null
    }
  }
}

export default BaseApi
