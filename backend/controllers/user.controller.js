const userService = require("../services/user.service")

class UserController {
    async Register(req, res, next){
        try {
            const {username, userClass, userEmail, userPassword} = req.body
            const addUser = await userService.register(username, userClass, userEmail, userPassword)
            if(addUser == "Error: Bu emaildagi user allaqachon mavjud!"){
                throw new Error(addUser)
            }
            res.json(addUser).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }

    async Login(req, res, next){
        try {
            const {userEmail, userPassword } = req.body
            const loginUser = await userService.Login(userEmail, userPassword)
            if(loginUser == "Error: Parolingiz noto'g'ri!"){
                throw new Error(loginUser)
            } else if(loginUser == "Error: Bu emailda user topilmadi!"){
                throw new Error(loginUser)
            }
            res.json(loginUser).status(200)
        } catch (error) {
            res.json({error: error.message})
        }
    }
}

module.exports = new UserController()