import express from 'express';
import { prisma } from '../db';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// POST /api/jobs - Create a new job (Only Employers)
router.post('/', protect, restrictTo('EMPLOYER'), async (req, res) => {
    try {
        const { title, description, location, salaryMin, salaryMax } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                error: 'Title and description are required'
            });
        }

        const job = await prisma.job.create({
            data: {
                title,
                description,
                location,
                salaryMin,
                salaryMax,
                postedBy: req.user!.userId
            },
            include: {
                poster: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
            },
        });
        res.status(201).json({
            message: 'Job posted successfully',
            job,
        });
    } catch (error: any) {
        console.error('Job creation error', error);
        res.status(500).json({
            error: 'Failed to post job'
        });
    }
});

// GET /api/jobs - Get all jobs (Public - no auth needed)
router.get('/', async (req, res) => {
    try {
        const jobs = prisma.job.findMany({
            include: {
                poster: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(jobs);
    } catch( error: any){
        res.status(500).json({
            error: 'Failed to get jobs'
        });
    }
});

// GET /api/jobs/:id - Get a single job
router.get('/:id', async (req, res) => {
    try{
        const job = await prisma.job.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include:{
                poster: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
            },
        });
        if(!job){
            res.status(404).json({
                error: 'Job not found'
            });
        }
        res.json(job);
    } catch (error){
        res.status(500).json({
            error: ' Failed to fetch job'
        });
    }
});

export default router;