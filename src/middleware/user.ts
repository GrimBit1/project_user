import { userSchema } from "../validation/user.js"
import { NextFunction, Request, Response } from 'express'

export const validUserData = (req: Request, res: Response, next: NextFunction) => {
    const { data, error, success } = userSchema.safeParse(req.body)
    if (!success) {
        res.status(400).json({ message: "User validation error", error })
        return
    }
    req.body = data
    next()

}

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.role)
    if (req.role !== 'admin' && req.userId !== req.params.id) {
        res.status(401).json({ message: 'Access denied' });
        return
    }
    next()
}