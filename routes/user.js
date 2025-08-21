const { Router } = require("express")
const userRouter = Router();

userRouter.post("/signup",function(req,res){
    res.json({
        msg : "signup successfully"
    })
})
userRouter.post("/signin",function(req,res){
    res.json({
        msg : "signin successfully"
    })
})
userRouter.get("/purchases",function(req,res){
    res.json({
        msg : "purchases successfully"
    })
})

module.exports = {
    userRouter : userRouter
}