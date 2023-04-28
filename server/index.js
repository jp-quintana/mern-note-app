import express from 'express';
import { connectDB } from './config/db.js';
import notesRouter from './routes/notes.js';
import { handleError } from './middlewares/handleError.js';

const app = express();

app.use(express.json());

app.use('/api/notes', notesRouter);

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
