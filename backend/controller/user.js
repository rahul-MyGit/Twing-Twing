const Notification = require("../model/notification");
const User = require("../model/userModel");
const getUserProfile = async (req, res)=>{
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("error in getUserProfile", error.message);
    }
}

const followUnfollowUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser  = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({error: "You cannot follow yourself"});
        }

        if(!userToModify || !currentUser){
            return res.status(404).json({error: "User not found"});
        }

        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            await User.findByIdAndUpdate(id, {$pull : {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, {$pull : {following: id}})
            res.status(200).json({msg: "User unfollowed succesfully"});
            //TODO: later send modified Id

        }else{
           await User.findByIdAndUpdate(id, {$push: {followers: req.user._id} });
           await User.findByIdAndUpdate(req.user._id, {$push: {following: id} });

           const newNotification = new Notification({
            type: "follow",
            from: req.user._id,
            to: userToModify._id,
           })
           await newNotification.save();

           //TODO: return the id of the user as a response
           res.status(200).json({msg: "User followed successfully"})
        }

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("error in follow or Unfollow User", error.message);
    }
}

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId   }
                }
            },
            {$sample: { size: 10}}
        ])

        //total id= 1,2,3,4,5,6,7,8,9,10
        //after filtered = 1,2,3,4,5
        //return 1,2,3,4
        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0,4);

        suggestedUsers.forEach(user=>(user.password = null));
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in geting the sugestions", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const updateUserProfile = async (req,res)=>{
    
}

module.exports = {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers,
    updateUserProfile
}