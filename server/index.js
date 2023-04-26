import express from 'express';
import notesRouter from './routes/notes.js';

const app = express();

app.use('/api/notes', notesRouter);

app.listen(8080);
console.log('listening on port 8080');
