import { createContext } from 'react';

const NoteContext = createContext({
  notesAreReady: false,
  notes: [],
  selectedNote: null,
});

export default NoteContext;
