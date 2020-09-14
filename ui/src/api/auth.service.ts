import BaseAPI from './base'
import Cookies from 'js-cookie'

class AuthAPI extends BaseAPI {
  async Login (username: string, password: string): Promise<any> {
    const data = await this.post('login', {
      username,
      password
    })
    if (data) {
      Cookies.set('token', data.access_token)
      return data
    }
  }
}

export default new AuthAPI()
