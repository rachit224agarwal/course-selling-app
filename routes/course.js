const { Router } = require("express")
const courseRouter = Router();

courseRouter.post("/purchase",function(req,res){
    res.json({
        msg : "signup successfully"
    })
})
courseRouter.get("/preview",function(req,res){
    res.json({
        msg : "signup successfully"
    })
})

module.exports = { courseRouter }