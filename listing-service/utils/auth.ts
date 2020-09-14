
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from '../config'

async function hashPassword (password: string) {
  const hash = await bcrypt.hashSync(password, 8)
  return hash
}

function signJWT(id: string, username: string) {
  return jwt.sign({ id, username }, config.secret, { expiresIn: 60 * 60 })
}

// middleware - intercept the request, check for auth, issue new token if valid
const checkJWT = (req: Request, res: Response, next: NextFunction ) => {
  const token = <string>req.headers['auth']
  if (!token) return res.status(401).send('no auth token')
  try {
    const jwtPayload = <any>jwt.verify(token, config.secret)
    // store in locals so controller after middleware can access this
    res.locals.jwtPayload = jwtPayload
    // deconstruct the payload and issue a new token - handles sliding expiration
    const { id, nickname } = jwtPayload
    const newToken = signJWT(id, nickname)
    res.setHeader('token', newToken)
    next()
  } catch (err) {
    // failed - return unauthorised
    return res.status(401).send()
  }
}

export { checkJWT, signJWT, hashPassword }
