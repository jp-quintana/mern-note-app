import { useState } from 'react';
import { useNotesContext } from './useNotesContext';

const DUMMY_NOTES = [
  { id: '1', title: 'TO DO', emoji: '🐑', isFavorite: true },
  { id: '2', title: 'Grocery list', emoji: '', isFavorite: false },
  { id: '3', title: 'Goals', emoji: '', isFavorite: false },
  { id: '4', title: 'Weight loss', emoji: '', isFavorite: false },
];

export const useNote = () => {
  const { notes, dispatch } = useNotesContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNote = () => {};

  const setSelectedNote = async (id) => {
    setError(null);

    // TODO: Add request
    try {
      const selectedNote = notes.find((note) => note.id === id);
      dispatch({ type: 'SET_SELECTED_NOTE', payload: selectedNote });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 'content';
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  const editSelectedNote = (key, value) => {
    dispatch({ type: 'EDIT_SELECTED_NOTE', payload: { key, value } });
  };

  return {
    setSelectedNote,
    createNote,
    editSelectedNote,
    isLoading,
    error,
  };
};
