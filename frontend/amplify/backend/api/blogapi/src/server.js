import express from 'express';
import dotenv from 'dotenv';
import blogs from './routes/blogRoutes.js';
import users from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import uploadRoutes from './routes/imageRoutes.js';


const env = dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

const app = express()

// Enhanced CORS configuration
const allowedOrigins = [
    'http://localhost:5001', // Local development
    'https://master.d16q4wlo0s2s1v.amplifyapp.com/', // Your Amplify URL
    'https://www.yourdomain.com' // If using custom domain
  ];

  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/blogs', blogs)
app.use('/users', users)
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);
 
app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));