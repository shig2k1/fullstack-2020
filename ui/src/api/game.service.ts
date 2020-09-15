import BaseApi from './base'

class GameAPI extends BaseApi {
  async CreateGame (owner: string) {
    const data = await this.sPost('/game/create', { owner })
    return data
  }
}

const gameAPI = new GameAPI()
export default gameAPI
