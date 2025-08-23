require("dotenv").config();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db")
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { useMiddleware_Admin } = require("../middleware/admin");
const { jwtSecretAdmin } = require("../config");



adminRouter.post("/signup",async function(req,res){
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
        await AdminModel.create({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName
        });
        res.json({
            msg : "Admin Signed up"
        })
        
    }catch(e){
        res.status(403).json({
            msg : "Admin already exits or some server/db issue"
        })
    }
})
adminRouter.post("/signin", async function(req,res){
    const { email , password } = req.body;
     const admin = await AdminModel.findOne({
        email : email
     })
    if(!admin){
        res.status(403).json({
            message : "Wrong Email"
        })
        return 
    }
    const passwordMatch = await bcrypt.compare(password , admin.password) 
    if(passwordMatch){
        const token = jwt.sign({
            id : admin._id.toString(),
        },jwtSecretAdmin, { expiresIn: "70d" })

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
adminRouter.post("/course", useMiddleware_Admin ,async function(req,res){
        const adminId = req.userId;

        const {  title, description, price,imageUrl } = req.body;

        const course = await CourseModel.create({
            title:title,
            description:description,
            price:price, 
            imageUrl:imageUrl,
            creatorId:adminId
        })

        res.json({
             msg : "Course created",
             courseId : course._id
        })
})
adminRouter.put("/course", useMiddleware_Admin ,async function(req,res){
     const adminId = req.userId;

        const {  title, description, price, imageUrl, courseId } = req.body;

        const course = await CourseModel.updateOne({
            _id:courseId,
            creatorId:adminId // protect diff creator updating others courses
        },{
            title:title,
            description:description,
            price:price, 
            imageUrl:imageUrl
        })

        res.json({
             msg : "Course updated",
             courseId : course._id
        })
})
adminRouter.get("/course", useMiddleware_Admin ,async function(req,res){
       const adminId = req.userId

        const course = await CourseModel.find({
            creatorId:adminId
        })
        res.json({
            msg : "All Courses",
            courses : course
        })
})

module.exports = { adminRouter }