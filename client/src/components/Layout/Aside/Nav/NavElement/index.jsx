import { NavLink } from 'react-router-dom';

import { useNotesContext } from 'hooks/useNotesContext';

const NavElement = ({ id, to, emoji, title, className }) => {
  const { selectedNote } = useNotesContext();

  if (id === selectedNote.id) {
    return (
      <NavLink to={to}>
        <div className={className}>{selectedNote.emoji || `\u{1F5CB}`}</div>
        <p>{selectedNote.title}</p>
      </NavLink>
    );
  }

  return (
    <NavLink to={to}>
      <div className={className}>{emoji || `\u{1F5CB}`}</div>
      <p>{title}</p>
    </NavLink>
  );
};

export default NavElement;
