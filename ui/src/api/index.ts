import axios from 'axios'
import config from '@/config'

class GameAPI {
  static async GetUser (nickname: string) {
    try {
      const data = await axios.get(`${config.api.player}/${nickname}`)
      return data
    } catch (err) {
      console.log('err', err)
    }
  }
}

export default GameAPI
