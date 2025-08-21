const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db")

adminRouter.post("/signup",function(req,res){
    res.json({
        msg : "signup"
    })
})
adminRouter.post("/signin",function(req,res){
    res.json({
        msg : "signin"
    })
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

module.exports({
    adminRouter : adminRouter
})