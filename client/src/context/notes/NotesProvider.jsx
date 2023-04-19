import { useReducer, useEffect } from 'react';

import NotesContext from './notes-context';

const DUMMY_NOTES = [
  { id: '1', title: 'TO DO', emoji: '🐑', isFavorite: true },
  { id: '2', title: 'Grocery list', emoji: '', isFavorite: false },
  { id: '3', title: 'Goals', emoji: '', isFavorite: false },
  { id: '4', title: 'Weight loss', emoji: '', isFavorite: false },
];

const initialState = {
  notesAreReady: false,
  notes: [],
  selectedNote: null,
};

const notesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_NOTES': {
      return {
        notesAreReady: true,
        notes: payload,
        selectedNote: null,
      };
    }
    case 'SET_SELECTED_NOTE': {
      return {
        ...state,
        selectedNote: payload,
      };
    }
    case 'EDIT_SELECTED_NOTE': {
      const { key, value } = payload;
      return {
        ...state,
        selectedNote: { ...state.selectedNote, [key]: value },
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

  console.log('hola', state);

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;