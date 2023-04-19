import { useState, useEffect } from 'react';
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
  const { setSelectedNote, error } = useNote();

  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(null);
    const fetchSelectedNote = async () => {
      const content = await setSelectedNote(noteId);
      setContent(content);
    };

    fetchSelectedNote();
  }, [noteId]);

  console.log('content', content);

  return (
    <>
      {!content && <p>Loading...</p>}
      {content && <SelectedNote content={content} />}
    </>
  );
};

export default Note;
