import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { useNoteContext } from './useNoteContext';

export const useNote = () => {
  const { notes, selectedNote, dispatch } = useNoteContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNote = async () => {
    setIsLoading(true);

    try {
      const updatedNotes = [...notes];
      const newNote = { id: uuid(), title: '', emoji: '', isFavorite: false };
      updatedNotes.push(newNote);

      dispatch({ type: 'SAVE_CHANGES', payload: updatedNotes });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        id: newNote.id,
      });

      await axios.post('/api/notes/', body, config);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }
  };

  const setSelectedNote = async (id) => {
    setIsLoading(true);
    try {
      const selectedNote = notes.find((note) => note.id === id);

      dispatch({
        type: 'SET_SELECTED_HEADER',
        payload: { ...selectedNote, content: null },
      });

      const res = await axios.get(`/api/notes/${id}`);

      dispatch({ type: 'SET_SELECTED_CONTENT', payload: res.data.content });

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      if (err.response.status === 404) {
        const updatedNotes = [...notes];

        const existingNoteIndex = notes.findIndex((note) => note.id === id);

        if (existingNoteIndex >= 0) {
          updatedNotes.splice(existingNoteIndex, 1);

          console.log(updatedNotes);

          dispatch({
            type: 'NOTE_NOT_FOUND',
            payload: updatedNotes,
          });
        }
      }

      setIsLoading(false);
    }
  };

  const editSelectedNote = (key, value) => {
    dispatch({ type: 'EDIT_SELECTED_NOTE', payload: { key, value } });
  };

  const saveSelectedChanges = async ({ id, title, emoji, content }) => {
    setError(null);

    // TODO: Add request
    try {
      const updatedNotes = [...notes];
      const currentSelectedNote = selectedNote;

      delete currentSelectedNote.content;

      const existingNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNoteIndex, 1, currentSelectedNote);

      dispatch({
        type: 'SAVE_SELECTED_CHANGES',
        payload: { notes: updatedNotes, content },
      });

      // TODO: create object to pass to server
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      // const body = JSON.stringify({
      //   id: newNote.id,
      // });

      // await axios.post('/api/notes/', body, config);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const toggleFavoriteNote = async (id) => {
    setError(null);

    // TODO: Add request

    try {
      const updatedNotes = [...notes];

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes[existingNoteIndex].isFavorite =
        !updatedNotes[existingNoteIndex].isFavorite;

      let payload;

      if (selectedNote && selectedNote.id === id) {
        payload = {
          notes: updatedNotes,
          selectedNote: updatedNotes[existingNoteIndex],
        };
      } else {
        payload = { notes: updatedNotes, selectedNote };
      }

      dispatch({
        type: 'TOGGLE_FAVORITE_NOTE',
        payload,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const duplicateNote = async (id) => {
    setError(null);
    // setIsLoading(true);

    // TODO: Add request

    try {
      const updatedNotes = [...notes];

      const existingNote = notes.find((note) => note.id === id);

      const duplicate = {
        id: uuid(),
        title: `Copy of ${existingNote.title}`,
        emoji: existingNote.emoji,
        isFavorite: false,
      };

      await new Promise((resolve) => setTimeout(resolve, 100));

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes.splice(existingNoteIndex + 1, 0, duplicate);

      dispatch({ type: 'SAVE_CHANGES', payload: updatedNotes });

      // setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      // setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setError(null);
    setIsLoading(true);

    // TODO: Add request

    try {
      const updatedNotes = [...notes];

      const existingNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNoteIndex, 1);

      let payload;

      if (selectedNote && selectedNote.id === id) {
        payload = { notes: updatedNotes, selectedNote: null };
      } else {
        payload = { notes: updatedNotes };
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      dispatch({ type: 'DELETE_NOTE', payload });

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return {
    setSelectedNote,
    createNote,
    editSelectedNote,
    saveSelectedChanges,
    toggleFavoriteNote,
    duplicateNote,
    deleteNote,
    isLoading,
    error,
  };
};
