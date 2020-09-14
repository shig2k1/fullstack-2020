import axios from 'axios'
import config from '@/config'

type APIResponse<t> = {
  code: number;
  message: string;
  data: t;
}

class BaseApi {
  static async get (url: string) {
    try {
      const response = await axios.get(`${config.api.player}/${url}`)
      console.log('response', response)
      return response.data
    } catch (err) {
      return null
    }
  }
}

class GameAPI extends BaseApi {
  static async GetUser (nickname: string): Promise<APIResponse<object>> {
    const data = await this.get(`player/${nickname}`)
    return data
  }
}

export default GameAPI
