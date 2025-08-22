require("dotenv").config();
const bcrypt = require("bcrypt");
const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db")
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const jwtSecretAdmin = process.env.JWT_ADMIN_SECRET;


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
        },jwtSecretAdmin)

        //do cookie logic
        res.cookie("token",token,{
            secure:true,
            sameSite:'strict',
            httpOnly:true
        })

        res.json({
            msg : "signin successfully"
        })
    }else{
        res.status(403).json({
            message : "Wrong Credentials"
        })
    }
})
adminRouter.post("/course",function(req,res){
    res.json({
        msg : "signup"
    })
})
adminRouter.put("/course",function(req,res){
    res.json({
        msg : "signup"
    })
})
adminRouter.get("/course",function(req,res){
    res.json({
        msg : "signup"
    })
})

module.exports = { adminRouter }