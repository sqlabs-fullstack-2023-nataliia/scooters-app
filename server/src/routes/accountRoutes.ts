import express, { Request, Response, NextFunction } from 'express';
import {
    register,
    login,
    getMyData
} from '../controllers/accountController';
import jwt from 'jsonwebtoken';



const router = express.Router();
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).send('Token not exist');
    }
    try {
        const userId = jwt.verify(token, 'YX48WVG6lFU6d6FOkpcbzBWRdju1C7W5V4MBE5z6JE9yHGFd0btZGXagOCZ2Dksc') as jwt.JwtPayload;
        req.user = userId;
    } catch (error) {
        return res.status(401).send('Invalid token');
    }

    next();
}

router.post('/register', register);
router.post('/login', login);
router.get('/getMyData', verifyToken, getMyData);

export default router;