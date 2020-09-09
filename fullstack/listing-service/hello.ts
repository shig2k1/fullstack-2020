import { Request, Response } from 'express'

const hello = (req:Request, res:Response) => {
    res.send(`Listing service`)
}

export default hello
