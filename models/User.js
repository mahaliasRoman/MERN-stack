import Mongoose from "mongoose";
const {Schema} = Mongoose
const {model} = Mongoose
const {Types} = Mongoose

const schema = new Schema({
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type:Types.ObjectId, ref:'Link'}]
})

export default model('User', schema)