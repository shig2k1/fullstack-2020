import BaseApi from './base'

type APIResponse<t> = {
  code: number;
  message: string;
  data: t;
}

class GameAPI extends BaseApi {
  async GetUser (): Promise<APIResponse<object>> {
    const data = await this.sGet('player')
    return data
  }
}

const gameAPI = new GameAPI()
export default gameAPI
