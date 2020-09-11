import { Request, Response } from 'express'

import conn from '../utils/conn'
import iRouteController from '../interfaces/iroutecontroller'

const { app, io } = conn

class GameController implements iRouteController {
  private ROOT = 'game'
  
  public InitRoutes() {
    
    // add routes to the app
    app.get(`/${this.ROOT}/`, this.root)
  }

  async root (req: Request, res: Response) {
    res.send('Whoop!')
    io.emit('msg', 'ho! - you love it!')
  }
}

const gameController = new GameController()
export default gameController
