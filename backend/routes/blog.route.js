const express = require("express")
const blogController = require("../controllers/blog.controller")

const router = express.Router()

router.get("/get-one/:id", blogController.getOne)
router.get("/my/get-blog", blogController.getAll)
router.post("/add-blog", blogController.addBlog)
router.delete("/delete/:id", blogController.delete)
router.put("/update/:id", blogController.Update)

module.exports = router