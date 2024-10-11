import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization') ?? req.cookies.token;

    if (!token) {
        res.status(401).json({ error: 'Access denied' })
        return
    };
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
export default verifyToken