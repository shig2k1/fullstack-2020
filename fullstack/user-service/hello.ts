import { Request, Response } from 'express'

const hello = (req:Request, res:Response) => {
    res.send(`User service`)
}

export default hello
