import UserModel from "./../model/userModel.js"
import bcrypt from "bcrypt";


//get user
export const getUser = async (req, res) => {
    const id = req.params.id

    try{
        const user = await UserModel.findById(id)
        if(user){
            const {password, ...otherUserInfo} = user['_doc']
            res.status(200).json(otherUserInfo)
        }else{
            res.status(404).json("user not found")
        }
    }catch(err){
        res.status(500).send({from: "get user controller", error: err})
    }
}

//update user
export const updateUser = async (req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus, password} = req.body



  try{
      if(id===currentUserId || currentUserAdminStatus){
            if (password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

          const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
          res.status(200).json(user)
      }else{
          res.status(403).json("does not have permission")
      }
  }catch(e){
        res.status(500).send({from: "update user controller", error: e})
  }
}

//Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus}= req.body

    try {
        if (currentUserId===id || currentUserAdminStatus ){
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("deleted user successfully")
        }else{
            res.status(403).json("does not have permission")
        }
    }catch (e) {
        res.status(500).send({from: "delete user controller", error: e})
    }

}

//follow user
export const followUser = async (req, res) => {
    // go to any user profile page
    const id = req.params.id // id any user

    // login user (myself)
    const {currentUserId} = req.body // myself

    try {
        if (currentUserId===id){
            return res.status(403).json("You don't follow yourself")
        }else{
            const otherUser = await UserModel.findById(id)
            const mySelf = await UserModel.findById(currentUserId)

            if (!otherUser['followers'].includes(currentUserId)){
                await otherUser.updateOne({$push: {followers: currentUserId}})
                await mySelf.updateOne({$push: {following: id}})
                res.status(200).json("successfully you follow this user")
            }else{
                res.status(409).json("You already Followed")
            }

        }
    }catch(err){
        res.status(500).send({from: "follow user controller", error: err})
    }
}

//Unfollow user
export const unfollowUser = async (req, res) => {
    // go to any user profile page
    const id = req.params.id // id any user

    // login user (myself)
    const {currentUserId} = req.body // myself

    try {
        if (currentUserId===id){
            return res.status(403).json("You don't follow yourself")
        }else{
            const otherUser = await UserModel.findById(id)
            const mySelf = await UserModel.findById(currentUserId)

            if (otherUser['followers'].includes(currentUserId)){
                await otherUser.updateOne({$pull: {followers: currentUserId}})
                await mySelf.updateOne({$pull: {following: id}})
                res.status(200).json("successfully you unfollow this user")
            }else{
                res.status(409).json("You currently unfollow this user")
            }

        }
    }catch(err){
        res.status(500).send({from: "follow user controller", error: err})
    }
}