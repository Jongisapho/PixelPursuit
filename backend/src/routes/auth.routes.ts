import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!;

//POST /api/auth/register
router.post('/register', async(req, res) => {
    try{
        const { email, password, name, role } = req.body;

        // Validate
        if(!email || !password){
            return res.status(400).json({
                error: 'Email and Password are required'
            });
        }

        const neutralizedEmail = email.toLowerCase().trim();

        // Checking user existence
        const existingUser = await prisma.user.findUnique({
            where: {email: neutralizedEmail},
        });

        if(existingUser){
            return res.status(409).json({
                message: 'User with this Email is already registered'
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // User Creation
        const user = await prisma.user.create({
            data: {
                email: neutralizedEmail,
                password: hashedPassword,
                name: name?.trim() || null,
                role: role?.toUpperCase() === 'EMPLOYER' ? 'EMPLOYER' : 'JOBSEEKER',
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true, 
                createdAt: true,
            },
        });

        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error: any){
        console.error('Registration error', error);
        res.status(500).json({ error: 'Something went wrong'});
    }
});
//POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: 'Email and Password required'
            });
        }

        const neutralizedEmail = email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
            where: {email: neutralizedEmail},
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true
            },
        });

        if(!user){
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate JWT (expires in 7 days)
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        const { password: _, ...userWithoutPassword } = user;
        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
        });
    } catch (error: any){
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
});
//GET /api/auth/me - get logged-in user
router.get('/me', async(req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number};
        const user = await prisma.user.findUnique({
            where: {id: decoded.userId},
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
        });
        if(!user){
            return res.status(404).json({
                error: 'User not found'
            });
        }
        res.json(user);
    } catch (error){
        res.status(401).json({
            error: 'Invalid token'
        });
    }
});

export default router;