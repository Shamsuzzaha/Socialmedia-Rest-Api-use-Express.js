import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'users'},
    desc: {type: String},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    image: {type: String},
},
    { timestamps: true, versionKey: false }
)
const PostModel = mongoose.model('posts', postSchema);
export default PostModel;