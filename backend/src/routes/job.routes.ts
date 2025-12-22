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

router.get('/', async(req, res) =>{
    try {
        const {
            search,
            location,
            minSalary,
            maxSalary,
            page = '1',
            limit = '10',
        } = req.query;

        // dynamic prisma where clause
        const where: any = {};

        // keyword search : case-insensetive
        if(search && typeof search === 'string' && search.trim()){
            const keyword = search.trim();
            where.OR = [
                { title: { contains: keyword, mode: 'insensitive' }},
                { description: {contains: keyword, mode: 'insensitive'}},
            ];
        }

        // location filter : case-insensitive
        if(location && typeof location === 'string' && location.trim()){
            where.location = {
                contains: location.trim(),
                mode: 'insensitive',
            };
        }

        // Salary range filter
        if (minSalary || maxSalary){
            where.AND = [] // must push conditions
            if(minSalary && !isNaN(Number(minSalary))){
                const min = Number(minSalary);
                where.AND.push({
                    OR: [
                        {
                            salaryMax : { gte: min} // job max >= desird min
                        },
                        {
                            salaryMax : null // or no max set
                        },
                        {
                            salaryMin : { gte: min } // or min already high enough
                        },
                    ],
                });
            }

            if(maxSalary && !isNaN(Number(maxSalary))){
                const max = Number(maxSalary);
                where.AND.push({
                    OR: [
                        {
                            salaryMin: {lte: max} // job min <= desired max
                        },
                        { 
                            salaryMin: null 
                        },
                        {
                            salaryMax: {lte: max}
                        }
                    ],
                });
            }
        }

        // Pagination (simple for now)
        const pageNum = Math.max(1, parseInt(page as string, 10));
        const limitNum = Math.min(50, parseInt(limit as string, 10)); // max 50 per page
        const skip = (pageNum - 1) * limitNum;

        // Fetch jobs with filter
        const jobs = await prisma.job.findMany({
            where,
            include: {
                poster: {
                    select: {id: true, name: true, email: true},
                },
                _count: {
                    select: {applications: true}
                },
            },
                orderBy: { createdAt: 'desc'},
                skip,
                take: limitNum,
        });

        const total = await prisma.job.count({where});

        res.json({
            jobs, pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    } catch (error: any){
        console.error('Error searching jobs:', error);
        res.status(500).json({ error: 'Failed to search jobs'});
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
router.delete('/:id', protect, restrictTo('EMPLOYER'), async (req, res) => {
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
            where: { jobId: jobId }
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