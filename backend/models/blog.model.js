const { ObjectId } = require("mongodb")
const {model, Schema} = require("mongoose")

const blogSchema = new Schema({
    blogImg: {type: String, required: true},
    blogTitle: {type: String, required: true},
    blogDescription: {type: String, required: true},
    blogOwner: {type: ObjectId, required: true}
} , {timestamps: true})

module.exports = model("blog", blogSchema)