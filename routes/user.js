require("dotenv").config();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const userRouter = Router();
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { useMiddleware_User } = require("../middleware/user");
const { jwtSecretUser } = require("../config");



userRouter.post("/signup",async function(req,res){
    // ZOD validations
    const requireBody = z.object({
        email : z.string().email(),
        password : z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
       firstName : z.string().min(3).max(20),
       lastName : z.string().min(3).max(20)
    })

    const parseDatawithSuccess = requireBody.safeParse(req.body);

    if(!parseDatawithSuccess.success){
        res.json({
            message : "Incorrect Credentials",
            error : parseDatawithSuccess.error
        })
        return
    }

    const { email , password , firstName , lastName } = parseDatawithSuccess.data;

    try{
        const hashPassword = await bcrypt.hash(password,5);
        await UserModel.create({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName
        });
        res.json({
            msg : "User Signed up"
        })
        
    }catch(e){
        res.status(403).json({
            msg : "User already exits or some server/db issue"
        })
    }
})

userRouter.post("/signin",async function(req,res){
    const { email , password } = req.body;
     const user = await UserModel.findOne({
        email : email
     })
    if(!user){
        res.status(403).json({
            message : "Wrong Email"
        })
        return 
    }
    const passwordMatch = await bcrypt.compare(password , user.password) 
    if(passwordMatch){
        const token = jwt.sign({
            id : user._id.toString(),
        },jwtSecretUser, { expiresIn: "7d" })

        //do cookie logic
        res.cookie("token",token,{
            secure:true,
            sameSite:'strict',
            httpOnly:true
        })

        res.json({
            msg : "signin successfully",
            token : token
        })
    }else{
        res.status(403).json({
            message : "Wrong Credentials"
        })
    }
})

userRouter.get("/purchases", useMiddleware_User , async function(req,res){
    const userId = req.userId;
    const purchase = await PurchaseModel.find({
        userId,
     })
     const courseDetails = await CourseModel.find({
        _id : { $in : purchase.map(x => x.courseId) }
     })
     res.json({
        purchase,
        courseDetails
     })
})

module.exports = {
    userRouter
} 

