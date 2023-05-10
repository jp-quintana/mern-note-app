import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { useNote } from 'hooks/useNote';
import { useNoteContext } from 'hooks/useNoteContext';

import SelectedNote from 'components/SelectedNote';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Note = () => {
  const { noteId } = useParams();
  const { setSelectedNote, isLoading, error } = useNote();
  const { notes, selectedNote } = useNoteContext();

  useEffect(() => {
    const fetchSelectedNote = async () => {
      await setSelectedNote(noteId);
    };

    fetchSelectedNote();
  }, [noteId]);

  if (!notes.find((note) => note.id === noteId)) {
    return <Navigate to="/" />;
  }

  console.log(selectedNote);

  return (
    <>
      {selectedNote && (
        <>
          {!selectedNote.content && selectedNote.content !== '' && (
            <p>Loading...</p>
          )}
          {(selectedNote.content || selectedNote.content === '') && (
            <SelectedNote />
          )}
        </>
      )}
    </>
  );
};

export default Note;
