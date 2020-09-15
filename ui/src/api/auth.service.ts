import BaseAPI from './base'

type APIResponse<t> = {
  code: number;
  message: string;
  data: t;
}

class AuthAPI extends BaseAPI {
  async Login (username: string, password: string): Promise<any> {
    const data = await this.post('login', {
      username,
      password
    })
    if (data) {
      this.setToken(data.access_token)
      return data
    }
  }

  async GetUser (): Promise<APIResponse<any>> {
    const data = await this.sGet('player')
    return data
  }
}

export default new AuthAPI()
