const jwt = require("jsonwebtoken");
const { jwtSecretUser } = require("../config");


function useMiddleware_User(req,res,next){
    const token = req.cookies.token;
    if(!token){
        res.status(403).json({
            message:"No token , Authoriation denied"
        })
    }
    try {
       const decoded = jwt.verify(token,jwtSecretUser);
        req.userId = decoded.id ;
       next(); 
    } catch (e) {
        return res.status(403).json({
            message : "Token is not valid"
        })
    }

}

module.exports = {
    useMiddleware_User : useMiddleware_User
}

