import { useContext } from 'react';
import NoteContext from 'context/note/note-context';

export const useNoteContext = () => {
  return useContext(NoteContext);
};
