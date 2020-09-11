import { Request, Response } from 'express'

import mongoose from 'mongoose'
//import BreakfastSchema from './models/breakfast'
import Email from '../models/email'

import conn from '../utils/conn'

const { io } = conn

const hello = (req: Request, res: Response) => {
    io.emit('msg', 'yo yo yo shit is getting real!')
    res.send(`Listing service - is running huzza`)
}

const breakfast = async (req: Request, res: Response) => {
    /*const { eggs, drink } = req.body
    // handle data not supplied
    if (!eggs || !drink) res.status(500)
                            .send('missing data')
    else {
        const breakfast = new BreakfastSchema({ eggs, drink })
        breakfast.save(err => {
            if (err) res.status(500)
                        .send('nope - did not create breakfast')
            else res.status(200)
                    .send('made breakfast')
        })
    }*/
    try {
        const { email } = req.body
        const emailModel = new Email({
            email
        })

        const r = await emailModel.save()
        console.log('r', r)

        
        res.send('Whoop!')
    } catch(err) {
        res.status(500).send(err)
    }
}

export { hello, breakfast }
