const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    console.log("verifyToken middleware triggered");

    console.log(JWT_SECRET);

    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token format' });

    try {
        console.log("Token received:", token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded data:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken };