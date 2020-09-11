import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

const PlayerSchema = new Schema({
  nickname: {
    type: String,
    unique: true
  }
})

const PlayerModel = mongoose.model('Player', PlayerSchema)
export default PlayerModel
