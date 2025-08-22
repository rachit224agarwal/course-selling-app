require("dotenv").config();
const mongoose = require('mongoose')
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const dbUrl = process.env.DB_URL;


app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)



async function main(){
    await mongoose.connect(dbUrl)
    app.listen(process.env.PORT); 
    console.log(`Listening on ${process.env.PORT}`)
}

main();
