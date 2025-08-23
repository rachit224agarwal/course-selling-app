const { Router } = require("express");
const { CourseModel, PurchaseModel } = require("../db");
const { useMiddleware_User } = require("../middleware/user");
const courseRouter = Router();

courseRouter.post("/purchase",useMiddleware_User, async function(req,res){
    const userId = req.userId;
    const courseId =req.body.courseId
    await PurchaseModel.create({
        userId,
        courseId
     })
     res.json({
        msg : "You have successfully bought the course"
     })
})

courseRouter.get("/preview",async function(req,res){
     const course = await CourseModel.find({})
    
     res.json({
        course
     })
})

module.exports = { courseRouter }