import mongoose, { Schema } from 'mongoose'

const BreakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [6, 'too few eggs'],
        max: 12,
        required: [true, 'why no eggs?'],
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water'],
    },
})

const BreakfastModel = mongoose.model('Breakfast', BreakfastSchema)

export default BreakfastModel
export { BreakfastSchema }
