import { JsonWebTokenError } from "jsonwebtoken";
import { json } from "stream/consumers";

export { };

declare global {
    namespace Express {
        export interface Request {
            userId: string;
            role: string;
        }
    }
    namespace jwt {
        export interface JwtPayload {
            userId: string;
            role: string;
        }
    }
}