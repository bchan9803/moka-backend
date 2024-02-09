import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routers
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
