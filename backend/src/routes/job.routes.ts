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
        const jobs = await prisma.job.findMany({
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
    } catch (error: any) {
        res.status(500).json({
            error: 'Failed to get jobs'
        });
    }
});

// GET /api/jobs/:id - Get a single job
router.get('/:id', async (req, res) => {
    try {
        const jobId = Number(req.params.id);

        const job = await prisma.job.findUnique({
            where: {
                id: jobId
            },
            include: {
                poster: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
                _count: {
                    select: {
                        applications: true
                    }, // counts number of applications
                },
            },

        });
        if (!job) {
            res.status(404).json({
                error: 'Job not found'
            });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({
            error: ' Failed to fetch job'
        });
    }
});

// DELETE /api/jobs/:id - Delete a job (Only the employer who posted it)
router.delete('/:id', protect, async (req, res) => {
    try {
        const jobId = Number(req.params.id);
        const userId = req.user!.userId; // From protect middleware

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            select: { id: true, postedBy: true },
        });

        if (!job) {
            return res.status(404).json({
                error: 'Job not found'
            });
        }

        if (job.postedBy !== userId) {
            return res.status(403).json({
                error: 'You are not authorized to delete this job'
            });
        }

        const applications = await prisma.application.count({
            where: { id: jobId }
        });

        if (applications > 0) {
            return res.status(400).json({
                error: 'Cannot delete job post with active applications'
            })
        }

        await prisma.job.delete({
            where: { id: jobId },
        });

        res.json({
            message: 'Job was deleted successfully'
        });
    } catch (error: any) {
        console.error('Job deletion error', error);
        res.status(500).json({
            error: 'Failed to delete job'
        });
    }
});

export default router;