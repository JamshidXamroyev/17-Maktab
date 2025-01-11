const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")


class userService {
    async register(username, userClass, userEmail, userPassword){
        try {
            const existEmail = await userModel.findOne({userEmail})
            if(existEmail){
                throw new Error("Bu emaildagi user allaqachon mavjud!")
            }
            const hash = await bcrypt.hash(userPassword, 10)
            const adduser = await userModel.create({username, userClass, userEmail, userPassword: hash})
            return adduser
        } catch (error) {
            return error
        }
    }
    async Login(userEmail, userPassword){
        try {
            const login = await userModel.findOne({userEmail})
            if(!login){
                throw new Error("Bu emailda user topilmadi!")
            }

            const existPassword = await bcrypt.compare( userPassword, login.userPassword )
            if(!existPassword){
                throw new Error("Parolingiz noto'g'ri!")
            }
            return login
        } catch (error) {
            return error
        }
    }
}

module.exports = new userService()