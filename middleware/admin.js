const jwt = require("jsonwebtoken");
const { jwtSecretAdmin } = require("../config");


function useMiddleware_Admin(req,res,next){
      const token = req.cookies.token;
        if(!token){
            res.status(403).json({
                message:"No token , Authoriation of admin denied"
            })
        }
        try {
           const decoded = jwt.verify(token,jwtSecretAdmin);
           req.userId = decoded.id ;
           next(); 
        } catch (e) {
            return res.status(403).json({
                message : "Token is not valid"
            })
        }
}

module.exports = {
    useMiddleware_Admin : useMiddleware_Admin
}