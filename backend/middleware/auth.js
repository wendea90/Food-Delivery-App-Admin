import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    //create middleware
    //1st we will take the token from users using headers then we destructure from req.header
    const { token } = req.headers;

    //lets check whether we got token or not
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    //we will decode that token
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        //callback
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//so middleware created


export default authMiddleware;

//connect it with cartRoute.js