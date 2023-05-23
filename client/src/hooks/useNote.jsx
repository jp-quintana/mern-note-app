import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { useNoteContext } from './useNoteContext';

import formatDuplicateName from 'utils/formatDuplicateNames';

export const useNote = () => {
  const { notes, favoriteNotes, selectedNote, dispatch, editingNote } =
    useNoteContext();

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

      dispatch({ type: 'UPDATE_NORMAL_NOTES', payload: updatedNotes });

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
    dispatch({
      type: 'EDIT_SELECTED_NOTE',
      payload: { key, value },
    });
  };

  const saveSelectedChanges = async ({ id, title, emoji, content }) => {
    setError(null);

    try {
      const updatedNotes = [...notes];
      const updatedFavoriteNotes = [...favoriteNotes];
      const currentSelectedNote = selectedNote;

      delete currentSelectedNote.content;
      const existingNormalNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNormalNoteIndex, 1, currentSelectedNote);

      const existingFavoriteNoteIndex = favoriteNotes.findIndex(
        (note) => note.id === id
      );

      if (existingFavoriteNoteIndex >= 0) {
        updatedFavoriteNotes.splice(existingFavoriteNoteIndex, 1, {
          id: currentSelectedNote.id,
          title: currentSelectedNote.title,
          emoji: currentSelectedNote.emoji,
        });
      }

      dispatch({
        type: 'SAVE_SELECTED_CHANGES',
        payload: {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          content,
        },
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

  const favoriteNote = async (id) => {
    setError(null);

    try {
      const updatedNotes = [...notes];
      const updatedFavoriteNotes = [...favoriteNotes];

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes[existingNoteIndex].isFavorite = true;
      updatedFavoriteNotes.push({
        id: updatedNotes[existingNoteIndex].id,
        title: updatedNotes[existingNoteIndex].title,
        emoji: updatedNotes[existingNoteIndex].emoji,
      });

      let payload;

      if (selectedNote && selectedNote.id === id) {
        payload = {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          selectedNote: updatedNotes[existingNoteIndex],
        };
      } else {
        payload = {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          selectedNote,
        };
      }

      dispatch({
        type: 'TOGGLE_FAVORITE_NOTE',
        payload,
      });

      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      // const body = JSON.stringify({
      //   isFavorite: updatedNotes[existingNoteIndex].isFavorite,
      // });

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}/favorite`
        // body,
        // config
      );
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const unfavoriteNote = async (id) => {
    setError(null);

    try {
      const updatedNotes = [...notes];
      const updatedFavoriteNotes = favoriteNotes.filter(
        (note) => note.id !== id
      );

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes[existingNoteIndex].isFavorite = false;

      let payload;

      if (selectedNote && selectedNote.id === id) {
        payload = {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          selectedNote: updatedNotes[existingNoteIndex],
        };
      } else {
        payload = {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          selectedNote,
        };
      }

      dispatch({
        type: 'TOGGLE_FAVORITE_NOTE',
        payload,
      });

      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      // const body = JSON.stringify({
      //   isFavorite: updatedNotes[existingNoteIndex].isFavorite,
      // });

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}/unfavorite`
        // body,
        // config
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

      const existingNoteTitles = notes.map((note) => note.title);

      const formattedName = formatDuplicateName(
        `Copy of ${existingNote.title}`,
        existingNoteTitles
      );

      const duplicate = {
        id: uuid(),
        title: formattedName,
        emoji: existingNote.emoji,
        isFavorite: false,
      };

      const existingNoteIndex = notes.findIndex((note) => note.id === id);

      updatedNotes.splice(existingNoteIndex + 1, 0, duplicate);

      dispatch({ type: 'UPDATE_NORMAL_NOTES', payload: updatedNotes });

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

    try {
      const updatedNotes = [...notes];
      const updatedFavoriteNotes = [...favoriteNotes];

      const existingNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNoteIndex, 1);

      const existingFavoriteNoteIndex = favoriteNotes.findIndex(
        (note) => note.id === id
      );

      if (existingFavoriteNoteIndex >= 0) {
        updatedFavoriteNotes.splice(existingFavoriteNoteIndex, 1);
      }

      let payload;

      if (selectedNote && selectedNote.id === id) {
        payload = {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
          selectedNote: null,
        };
      } else {
        payload = { notes: updatedNotes, favoriteNotes: updatedFavoriteNotes };
      }

      dispatch({ type: 'DELETE_NOTE', payload });

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const sortNormalNotes = async (id, newIndex) => {
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      newOrder: updatedNotes.map((note) => note.id),
    });

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/sortNormalList`,
      body,
      config
    );
  };

  const sortFavoriteNotes = async (id, newIndex) => {
    const notesToUpdate = favoriteNotes.filter((note) => note.id !== id);

    notesToUpdate.splice(
      newIndex,
      0,
      notes.find((note) => note.id === id)
    );

    const updatedNotes = notesToUpdate.map((note, index) => ({
      ...note,
      index,
    }));

    dispatch({ type: 'SORT_FAVORITE_NOTES', payload: updatedNotes });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      newOrder: updatedNotes.map((note) => note.id),
    });

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/sortFavoriteList`,
      body,
      config
    );
  };

  const setEditingValue = (payload) => {
    dispatch({ type: 'SET_EDITING_NOTE', payload });
  };

  const editEditingNote = (key, value) => {
    dispatch({
      type: 'EDIT_EDITING_NOTE',
      payload: { key, value },
    });
  };

  const saveEditingChanges = async ({ id, title, emoji }) => {
    setError(null);

    try {
      const updatedNotes = [...notes];
      const updatedFavoriteNotes = [...favoriteNotes];
      const currentEditingNote = editingNote;

      const existingNormalNoteIndex = notes.findIndex((note) => note.id === id);
      updatedNotes.splice(existingNormalNoteIndex, 1, currentEditingNote);

      const existingFavoriteNoteIndex = favoriteNotes.findIndex(
        (note) => note.id === id
      );

      if (existingFavoriteNoteIndex >= 0) {
        updatedFavoriteNotes.splice(existingFavoriteNoteIndex, 1, {
          id: currentEditingNote.id,
          title: currentEditingNote.title,
          emoji: currentEditingNote.emoji,
        });
      }

      dispatch({
        type: 'SAVE_EDITING_CHANGES',
        payload: {
          notes: updatedNotes,
          favoriteNotes: updatedFavoriteNotes,
        },
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        title,
        emoji,
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

  return {
    setSelectedNote,
    createNote,
    editSelectedNote,
    saveSelectedChanges,
    favoriteNote,
    unfavoriteNote,
    duplicateNote,
    deleteNote,
    sortNormalNotes,
    sortFavoriteNotes,
    setEditingValue,
    editEditingNote,
    saveEditingChanges,
    isLoading,
    error,
  };
};
