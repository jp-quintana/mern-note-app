import { useContext } from 'react';
import NotesContext from 'context/notes/notes-context';

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  return context;
};
