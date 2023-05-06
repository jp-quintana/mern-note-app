import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { useAuthContext } from 'hooks/useAuthContext';

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
        ...state,
        notesAreReady: true,
        notes: payload,
      };
    }

    case 'NOTE_NOT_FOUND': {
      return {
        ...state,
        selectedNote: null,
        notes: payload,
      };
    }

    case 'SET_SELECTED_HEADER': {
      return {
        ...state,
        selectedNote: payload,
      };
    }

    case 'SET_SELECTED_CONTENT': {
      return {
        ...state,
        selectedNote: { ...state.selectedNote, content: payload },
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

    case 'SAVE_SELECTED_CHANGES': {
      return {
        ...state,
        notes: payload.notes,
        selectedNote: { ...state.selectedNote, content: payload.content },
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
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(noteReducer, initialState);

  console.log('notes', state);

  useEffect(() => {
    (async () => {
      if (user) {
        const res = await axios.get('/api/notes');
        dispatch({ type: 'LOAD_NOTES', payload: res.data });
      }
    })();
  }, [user]);

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
