import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
        if (!token || token === "null" || token === "undefined") {
            return res.status(400).json({
                message: "Token not found"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        console.log("Token verification error:", error.message)
        return res.status(401).json({
            message: "Session expired or invalid. Please login again."
        })
    }
}  