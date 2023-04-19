import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNote } from 'hooks/useNote';

import SelectedNote from '../../components/SelectedNote';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Note = () => {
  const { noteId } = useParams();
  const { setSelectedNote, isLoading, error } = useNote();

  useEffect(() => {
    setSelectedNote(noteId);
  }, [noteId]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <SelectedNote />}
    </>
  );
};

export default Note;
