import mongoose from "mongoose";

// User model
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        isAdmin: {
            type: Boolean,
            default: false
        },

        profilePicture: {
            type: String
        },
        coverPicture: {
            type: String
        },
        about: String,
        livesIn: String,
        workAt: String,
        relationship: String,
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
    },
    { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
