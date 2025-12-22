import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import jobRoutes from './routes/job.routes';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes); // <- protected + public routes

app.get('/', (req, res) => {
  res.json({
    message: 'PixelPursuit API is running !',
    endpoints: {
      health: 'GET /api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me',
      jobs: 'GET /api/jobs',
      postJob: 'POST /api/jobs (Employer only)',
      deleteJob: 'DELETE /api/jobs',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health: GET http://localhost:${PORT}/api/health`);
})
