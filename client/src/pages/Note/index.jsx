import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SelectedNote from '../../components/SelectedNote';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
  notes: [
    { id: '1', title: 'TO DO', emoji: '\u{1F984}', content: '' },
    { id: '2', title: 'Grocery list', emoji: '\u{1F5CB}', content: '' },
    { id: '3', title: 'Goals', emoji: '\u{1F5CB}', content: '' },
    { id: '4', title: 'Weight loss', emoji: '\u{1F5CB}', content: '' },
  ],
};

const Note = () => {
  const { noteId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  let selectedNote = USER.notes.find((note) => note.id === noteId);

  useEffect(() => {
    setIsLoading(true);
    const fetchNote = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      selectedNote = USER.notes.find((note) => note.id === noteId);
      setIsLoading(false);
    };

    fetchNote();
  }, [noteId]);

  console.log(selectedNote);

  return (
    <div className={`main-container`}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <SelectedNote
          id={selectedNote.noteId}
          initialTitle={selectedNote.title}
          initialEmoji={selectedNote.emoji}
          initialContent={selectedNote.content}
        />
      )}
    </div>
  );
};

export default Note;
