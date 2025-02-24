import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema({
    image:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
}, {collection:"blog"})

const BlogModel = mongoose.models.blog || mongoose.model('blog', BlogSchema);

export default BlogModel