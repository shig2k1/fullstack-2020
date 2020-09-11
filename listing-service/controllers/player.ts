import { Request, Response } from 'express'
import conn from '../utils/conn'
import iRouteController from '../interfaces/iroutecontroller'
import PlayerModel from '../models/player'

const { app, io } = conn

class PlayerController implements iRouteController {
  private ROOT = 'player'
  public InitRoutes() {
    
    // add routes to the app
    app.get(`/${this.ROOT}/`, this.root)

    // get player by nickname
    app.get(`/${this.ROOT}/:nickname`, this.getPlayerFromNickname)

    // create player
    app.post(`/${this.ROOT}/`, this.createPlayer)
  }

  async root (req: Request, res: Response) {
    const players = await PlayerModel.find()

    res.send(players)
    io.emit('msg', 'ho! - you love it!')
  }

  async createPlayer (req: Request, res: Response) {
    const { nickname } = req.body
    if (!nickname) return res
                            .status(400)
                            .send('nickname required')
    try {
      const playerModel = new PlayerModel({
        nickname
      })

      const r = await playerModel.save()
      console.log('r', r)

      res
        .status(200)
        .send(r)
    } catch (err) {
      res
        .status(400)
        .send(err)
    }
  }

  async getPlayerFromNickname (req: Request, res: Response) {
    const { nickname } = req.params
    if (!nickname) return res.status(400)
                              .send('nickname required')
    // find player matching nickname
    const player = await PlayerModel.find({ nickname })

    if (player.length > 0) return res.status(200)
                          .send(player[0])
    return res.status(404)
              .send(`Player not found with nickname: "${nickname}"`)
  }
}

const playerController = new PlayerController()
export default playerController