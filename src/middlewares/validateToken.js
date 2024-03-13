import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const validateAuthToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json(["Unauthorized"]);
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) return res.status(401).json(["Unauthorized"]);
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json(["Something went wrong"]);
    }
};