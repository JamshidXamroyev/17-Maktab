const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const userRoute = require("./routes/user.route")
const blogRoute = require("./routes/blog.route")

const app = express()
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(userRoute)
app.use(blogRoute)


// App
const PORT = process.env.PORT || 4000

const startApp = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        await app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
    } catch (error) {
        console.log("Server ishga tushmadi")
    }
}

startApp()

