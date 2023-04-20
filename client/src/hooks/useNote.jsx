import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useNotesContext } from './useNotesContext';

export const useNote = () => {
  const { notes, selectedNote, dispatch } = useNotesContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNote = () => {
    const updatedNotes = [...notes];
    updatedNotes.push({ id: uuid(), title: '', emoji: '', isFavorite: false });
    dispatch({ type: 'SAVE_CHANGES', payload: updatedNotes });
  };

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

  const saveChanges = async (id, content) => {
    setError(null);

    // TODO: Add request
    try {
      const updatedNotes = [...notes];

      const existingNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNoteIndex, 1, selectedNote);

      dispatch({ type: 'SAVE_CHANGES', payload: updatedNotes });
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  return {
    setSelectedNote,
    createNote,
    editSelectedNote,
    saveChanges,
    isLoading,
    error,
  };
};
