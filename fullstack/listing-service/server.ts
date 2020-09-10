import express from 'express'
import cors from 'cors'

import { hello, breakfast } from './hello'

const PORT = 8000

const app = express()
// allow JSON use
app.use(express.json())
// allow CORS
app.use(cors())


// routes
app.get('/', hello)
app.post('/breakfast', breakfast)
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})