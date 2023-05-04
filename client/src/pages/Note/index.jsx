import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNote } from 'hooks/useNote';
import { useNoteContext } from 'hooks/useNoteContext';

import SelectedNote from '../../components/SelectedNote';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Note = () => {
  const { noteId } = useParams();
  const { setSelectedNote, error } = useNote();
  const { selectedNote } = useNoteContext();

  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(null);
    const fetchSelectedNote = async () => {
      const content = await setSelectedNote(noteId);
      setContent(content);
    };

    fetchSelectedNote();
  }, [noteId]);

  return (
    <>
      {(!content || !selectedNote) && <p>Loading...</p>}
      {content && selectedNote && <SelectedNote initialContent={content} />}
    </>
  );
};

export default Note;
