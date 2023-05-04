import { useReducer, useEffect } from 'react';

import NoteContext from './note-context';

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

const noteReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_NOTES': {
      return {
        notesAreReady: true,
        // notes: payload,
        notes: [],
        selectedNote: payload[0],
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

    case 'TOGGLE_FAVORITE_NOTE': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'SAVE_CHANGES': {
      return {
        ...state,
        notes: payload,
      };
    }

    case 'DELETE_NOTE': {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  useEffect(() => {
    // TODO: Add request
    if (DUMMY_NOTES.length > 0) {
      dispatch({ type: 'LOAD_NOTES', payload: DUMMY_NOTES });
    } else {
      // TODO: Add "Getting Started" page
    }
  }, []);

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
