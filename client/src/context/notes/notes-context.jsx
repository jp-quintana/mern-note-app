import { createContext } from 'react';

const NotesContext = createContext({
  notesAreReady: false,
  notes: [],
  favoriteNotes: [],
  selectedNote: null,
});

export default NotesContext;
