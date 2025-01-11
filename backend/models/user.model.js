const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    username: {type: String, required: true},
    userClass: {type: String, required: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true},
}, {timestamps: true})

module.exports = model("user", userSchema)