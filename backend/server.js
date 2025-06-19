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
const PORT = process.env.PORT || 5000;

connectDB();

const app = express()



// Enhanced CORS configuration
// const allowedOrigins = [
//     'https://master.d16q4wlo0s2s1v.amplifyapp.com', // Your frontend
//     'http://localhost:3000',
// ];

// const corsOptions = {
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
      
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.error('CORS blocked for origin:', origin); // Debug
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }


app.use(cors({
  origin: 'https://master.d16q4wlo0s2s1v.amplifyapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if using cookies or Authorization headers
}));

// app.use(cors(corsOptions));
// Debug middleware (add this right after CORS setup)
app.use((req, res, next) => {
    console.log('Incoming Origin:', req.headers.origin);
    console.log('Request Method:', req.method);
    next();
});
// app.options('*', cors()); // Enable preflight for ALL routes
  

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/blogs', blogs)
app.use('/users', users)
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);
 
app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));