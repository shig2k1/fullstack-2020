import { Request, Response } from 'express'
import mongoose from 'mongoose'

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

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`

mongoose.connect(url, options)
    .then(() => {
        console.log('MONGODB is connected')
    })
    .catch(err => {
        console.log(err)
    })
    

const hello = (req:Request, res:Response) => {

    res.send(`User service - observed - AMAZING!`)
}

export default hello
