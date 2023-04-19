import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNote } from 'hooks/useNote';
import { useNotesContext } from 'hooks/useNotesContext';

import SelectedNote from '../../components/SelectedNote';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
  notes: [
    { id: '1', title: 'TO DO', emoji: '🐑', content: '' },
    { id: '2', title: 'Grocery list', emoji: '', content: '' },
    { id: '3', title: 'Goals', emoji: '', content: '' },
    { id: '4', title: 'Weight loss', emoji: '', content: '' },
  ],
};

const Note = () => {
  const { noteId } = useParams();
  const { setSelectedNote, isLoading, error } = useNote();
  const { selectedNote } = useNotesContext();

  useEffect(() => {
    console.log('is running');
    setSelectedNote(noteId);
  }, [noteId]);

  console.log(selectedNote);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <SelectedNote
          id={selectedNote.noteId}
          initialTitle={selectedNote.title}
          initialEmoji={selectedNote.emoji}
          initialContent={selectedNote.content}
        />
      )}
    </>
  );
};

export default Note;
