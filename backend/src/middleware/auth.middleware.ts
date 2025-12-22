import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Extending Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user? : {
                userId: number;
                email: string;
                role: 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';
            };
        }
    }
}

// Middleware: Authenticate user (attach user to req)
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
            email: string;
            role: 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';
        };

        // attaching user info to request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };

        next(); // proceed to route handler
    } catch (error){
        return res.status(401).json({
            error: 'Invalid or expired token yes'
        });
    }
};

// Middleware: Restrict to specific roles
export const restrictTo = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        if(!req.user){
            return res.status(401).json({
                error: "Authentication required"
            });
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                error: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};