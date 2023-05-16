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
      const newNote = {
        id: uuid(),
        title: '',
        emoji: '',
        isFavorite: false,
        index: notes.length,
        favoriteIndex: null,
      };
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

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes/`,
        body,
        config
      );

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

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`
      );

      dispatch({ type: 'SET_SELECTED_CONTENT', payload: res.data.content });

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      if (err.response.status === 404) {
        const updatedNotes = [...notes];

        const existingNoteIndex = notes.findIndex((note) => note.id === id);

        updatedNotes.splice(existingNoteIndex, 1);

        dispatch({
          type: 'NOTE_NOT_FOUND',
          payload: updatedNotes,
        });
      }

      setIsLoading(false);
    }
  };

  const editSelectedNote = (key, value) => {
    if (key !== 'updatedAt') {
    }

    dispatch({
      type: 'EDIT_SELECTED_NOTE',
      payload: { key, value },
    });
  };

  const saveSelectedChanges = async ({ id, title, emoji, content }) => {
    setError(null);

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

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        title,
        emoji,
        content,
      });

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
        body,
        config
      );
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const toggleFavoriteNote = async (id) => {
    setError(null);

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

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        isFavorite: updatedNotes[existingNoteIndex].isFavorite,
      });

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}/favorite`,
        body,
        config
      );
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const duplicateNote = async (id) => {
    setError(null);
    // setIsLoading(true);

    try {
      const updatedNotes = [...notes];

      const existingNote = notes.find((note) => note.id === id);

      const duplicate = {
        id: uuid(),
        title: `Copy of ${existingNote.title}`,
        emoji: existingNote.emoji,
        isFavorite: false,
      };

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes.splice(existingNoteIndex + 1, 0, duplicate);

      dispatch({ type: 'SAVE_CHANGES', payload: updatedNotes });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(duplicate);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}/duplicate`,
        body,
        config
      );

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

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const sortNotes = (id, newIndex, isFavorite) => {
    if (isFavorite) {
      const currentFavoriteNotes = notes.filter((note) => note.isFavorite);
      const notesToUpdate = currentFavoriteNotes.filter(
        (note) => note.id !== id
      );
      notesToUpdate.splice(
        newIndex,
        0,
        currentFavoriteNotes.find((note) => note.id === id)
      );
    } else {
      const notesToUpdate = notes.filter((note) => note.id !== id);

      notesToUpdate.splice(
        newIndex,
        0,
        notes.find((note) => note.id === id)
      );

      const updatedNotes = notesToUpdate.map((note, index) => ({
        ...note,
        index,
      }));

      dispatch({ type: 'SORT_NOTES', payload: updatedNotes });
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
    sortNotes,
    isLoading,
    error,
  };
};
