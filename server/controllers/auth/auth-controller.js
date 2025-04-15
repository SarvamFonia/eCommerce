const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config()

// Register
const registerUser = async(req,res) => {
    const {userName,email,password} = req.body;

    try{
        const checkUser = await User.findOne({email})
        if(checkUser) return res.json({success: false, message: 'User already exists with same Email ID'});
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({userName,email,password: hashPassword})
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration Successfull"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}
// Login
const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const checkUser = await User.findOne({email})
        if(!checkUser) return res.json({
            success: false,
            message: "User does'nt exists! Please register first."
        })

        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password)
        
        if(!checkPasswordMatch) return res.json({
            success: false,
            message: "Incorrect password! Please try again."
        })

        const token = jwt.sign({
            id: checkUser.id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        },process.env.JWT_SECRET, {expiresIn: '60m'})

        res.cookie('token',token, {httpOnly: true, secure: false}).json({
            success: true,
            message: 'User loged in successfully',
            sameSite: 'None',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

// Logout
const logout = async(req,res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully'
    })
}


// Auth middleware
const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: 'Unauthorized user!'
    })

    try{
        const decoded = await jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user = decoded;
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        });
    }
}
// Exports
module.exports = {registerUser, loginUser, logout, authMiddleware}