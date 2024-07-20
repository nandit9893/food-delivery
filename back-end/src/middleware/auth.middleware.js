import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Not authorized login again"});
    }
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.body.userId = decodedToken.id;
            //console.log(req.body.userId);
            next();
        } catch (error) {
            console.log(error);
            res.json({success:false, message:"Error"})
        }
}

export default authMiddleware;