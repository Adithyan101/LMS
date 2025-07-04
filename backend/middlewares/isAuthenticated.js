import jwt from "jsonwebtoken";



const isAuthenticated = async(req,res, next)=>{
    try {

        const token = req.cookies.token;
        console.log()
        if(!token) return res.status(401).json({message:"Not authenticated"});

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(401).json({message:"Invalid Token"});

        req.id = decode.userId;
        next();


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"isAuthenticated server error"})
    }
}

export default isAuthenticated