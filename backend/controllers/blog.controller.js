const BlogService = require("../services/blog.service")

class BlogController {
    async addBlog(req, res, next){
        try {
            const {blogImg, blogTitle, blogDescription, blogOwner} = req.body
            const addedBlog = await BlogService.addBlog(blogImg, blogTitle, blogDescription, blogOwner)
            res.json(addedBlog).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }

    async getAll(req, res, next){
        try {
            const blogs = await BlogService.getAll()
            res.json(blogs.reverse()).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params
            const deleteBlog = await BlogService.delete(id)
            res.json(deleteBlog).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params
            const getBlog = await BlogService.getOne(id)
            res.json(getBlog).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }

    async Update (req, res, next) {
        try {
            const {id} = req.params
            const putBlog = await BlogService.update(id, req.body)
            res.json(putBlog).status(200)
        } catch (error) {
            res.json({error: error.message}).status(400)
        }
    }
}

module.exports = new BlogController()