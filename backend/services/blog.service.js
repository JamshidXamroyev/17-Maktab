const blogModel = require("../models/blog.model")

class BlogService {
    async addBlog(blogImg, blogTitle, blogDescription, blogOwner){
        try {
            const blog = await blogModel.create({blogImg, blogTitle, blogDescription, blogOwner})
            return blog
        } catch (error) {
            return error
        }
    }

    async getAll(){
        try {
            const blogs = await blogModel.find()
            return blogs
        } catch (error) {
            return error
        }
    }

    async delete(id){
        try {
            const deletedBlog = await blogModel.findByIdAndDelete(id)
            return deletedBlog
        } catch (error) {
            return error
        }
    }

    async getOne(id){
        try {
            const getBlog = await blogModel.findById(id)
            return getBlog
        } catch (error) {
            return error
        }
    }

    async update(id, El){
        try {
            const put = await blogModel.findByIdAndUpdate(id, El)
            return put
        } catch (error) {
            return error
        }
    }
}

module.exports = new BlogService()