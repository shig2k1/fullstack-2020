
import Database from './utils/db'

import GameController from './controllers/game'
import PlayerController from './controllers/player'
import AuthController from './controllers/auth'

import conn from './utils/conn'

const PORT = 8000

const { http, io } = conn

// mongo connection
Database.connect();

// init routes within controllers
AuthController.InitRoutes()
GameController.InitRoutes()
PlayerController.InitRoutes()

http.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

// socket.io
io.on('connection', (socket: any) => {
  console.log('a user connected FUCK YEAH!!!')
})

io.on('disconnection', (socket: any) => {
  console.log('a user disconnected')
})