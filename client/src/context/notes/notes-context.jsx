import { createContext } from 'react';

const NotesContext = createContext({
  notesAreReady: false,
  notes: [],
  toggleFavoriteNotes: [],
  selectedNote: null,
});

export default NotesContext;
