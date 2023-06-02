import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { useAuthContext } from 'hooks/useAuthContext';

import NoteContext from './note-context';

const initialState = {
  notesAreReady: false,
  notes: [],
  favoriteNotes: [],
  selectedNote: null,
  editingValue: null,
};

const noteReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_NOTES': {
      return {
        ...state,
        notesAreReady: true,
        notes: payload.normalListOrder,
        favoriteNotes: payload.favoriteListOrder,
      };
    }

    case 'NOTE_NOT_FOUND': {
      return {
        ...state,
        selectedNote: null,
        // notes: payload,
      };
    }

    case 'SET_SELECTED_HEADER': {
      return {
        ...state,
        selectedNote: payload,
      };
    }

    case 'SET_SELECTED_CONTENT': {
      console.log('SET_SELECTED_CONTENT is running');
      return {
        ...state,
        selectedNote: !state.selectedNote
          ? null
          : { ...state.selectedNote, content: payload },
      };
    }

    case 'EDIT_SELECTED_NOTE': {
      const { key, value } = payload;
      return {
        ...state,
        selectedNote: {
          ...state.selectedNote,
          [key]: value,
          updatedAt: new Date(),
        },
      };
    }

    case 'SET_EDITING_VALUE': {
      return {
        ...state,
        editingValue: payload,
      };
    }

    case 'UPDATE_EDITING_VALUE': {
      const { key, value } = payload;
      return {
        ...state,
        editingValue: {
          ...state.editingValue,
          [key]: value,
          updatedAt: new Date(),
        },
      };
    }

    case 'SAVE_EDITING_VALUE':
    case 'UPDATE_EMOJI_FROM_NAV': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'TOGGLE_FAVORITE_NOTE': {
      return {
        ...state,
        notes: [...payload.notes],
        favoriteNotes: [...payload.favoriteNotes],
        selectedNote: { ...state.selectedNote, ...payload.selectedNote },
      };
    }

    case 'UPDATE_NORMAL_NOTES': {
      return {
        ...state,
        notes: payload,
      };
    }

    case 'SAVE_SELECTED_CHANGES': {
      return {
        ...state,
        notes: payload.notes,
        favoriteNotes: payload.favoriteNotes,
        selectedNote: { ...state.selectedNote, content: payload.content },
      };
    }

    case 'SORT_NORMAL_NOTES': {
      return {
        ...state,
        notes: payload,
      };
    }

    case 'SORT_FAVORITE_NOTES': {
      return {
        ...state,
        favoriteNotes: payload,
      };
    }

    case 'DELETE_NOTE': {
      console.log('DELETE_NOTE is running');

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
    if (user) {
      (async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes`
        );
        dispatch({ type: 'LOAD_NOTES', payload: res.data });
      })();
    }
  }, [user]);

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
