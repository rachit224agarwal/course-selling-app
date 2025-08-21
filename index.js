const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
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
