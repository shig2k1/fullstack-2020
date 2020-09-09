import express from 'express'
import cors from 'cors'

import hello from './hello'

const PORT = 8000

const app = express()
app.use(cors())
app.get('/', hello)
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})