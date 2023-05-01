import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { handleError } from './middlewares/handleError.js';
import notesRouter from './routes/notes.js';
import userRouter from './routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);
app.use('/api/user', userRouter);

app.use(handleError);

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
})();
