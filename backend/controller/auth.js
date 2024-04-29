const userSchema = require("../zod/types");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../lib/utils/generateToken");

const signup = async (req,res) =>{
    try {
    //ZOD:
    const response = userSchema.safeParse(req.body);
    if(!response.success){
        res.status(411).json({
            message: "Wrong Input for Sigup"
        });
        return;
    }

    //USER EXISTS:
    const existUser = await User.findOne({ username: req.body.username})
    if(existUser){ 
        return res.status(400).json({ message: "User already exist"});
    }

    //EMAIL EXISTS:
    const existEmail = await User.findOne({ email: req.body.email })
    if(existEmail){
        return res.status(400).json({ message: "Email already exist" });    
    }

    //HASHING PASSWORD:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATING USER:
    const newUser = await new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save();

        return res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg

        });
    }else{
        res.status(400).json({ message: "Error creating user" });
        return;
    }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req,res) =>{
    res.send('login');
}

const logout = async (req,res) =>{
    res.send('logout');
}


module.exports = {
    signup,
    login,
    logout
}