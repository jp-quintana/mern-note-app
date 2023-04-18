import { useReducer, useEffect } from 'react';

import NotesContext from './notes-context';

const DUMMY_NOTES = [];

const initialState = {
  notesAreReady: false,
  notes: [],
  favoriteNotes: [],
  selectedNote: 'id',
};

const notesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_NOTES': {
      const { notes, favoriteNotes, selectedNote } = payload;
      return {
        notesAreReady: true,
        notes,
        favoriteNotes,
        selectedNote,
      };
    }

    default:
      return state;
  }
};

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    // TODO: Add request
    dispatch({ type: 'LOAD_NOTES', payload: DUMMY_NOTES });
  }, []);

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
