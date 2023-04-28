import express from 'express';
import { connectDB } from './config/db.js';
import notesRouter from './routes/notes.js';

const app = express();

app.use(express.json());

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Listening on port ${8080}...`);
    });
  } catch (error) {
    console.error(error);
  }
})();
