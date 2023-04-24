import { createContext } from 'react';

const NotesContext = createContext({
  notesAreReady: false,
  notes: [],
  selectedNote: null,
});

export default NotesContext;
