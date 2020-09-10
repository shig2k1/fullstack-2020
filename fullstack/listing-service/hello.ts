import { Request, Response } from 'express'

import mongoose from 'mongoose'
import BreakfastSchema from './models/breakfast'

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

mongoose.connect(url, options)
    .then(() => {
        console.log('MONGODB is connected')
    })
    .catch(err => {
        console.log(err)
    })
    



const hello = (req: Request, res: Response) => {
    res.send(`Listing service - is running ${url}`)
}


const breakfast = (req: Request, res: Response) => {
    const { eggs, drink } = req.body
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
    }
}

export { hello, breakfast }
