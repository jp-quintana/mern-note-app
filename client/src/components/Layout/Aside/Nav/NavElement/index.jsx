import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaEllipsisH } from 'react-icons/fa';

import { useNotesContext } from 'hooks/useNotesContext';

import NavElementMenu from './NavElementMenu';

import Modal from 'components/Modal';

import styles from './index.module.scss';

const NavElement = ({ id, to, emoji, title, ellipsisClassName }) => {
  const { selectedNote } = useNotesContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };

  return (
    <NavLink to={to}>
      <div className={styles.emoji}>
        {id === selectedNote.id
          ? selectedNote.emoji || `\u{1F5CB}`
          : emoji || `\u{1F5CB}`}
      </div>
      <p>
        {id === selectedNote.id
          ? selectedNote.title.length > 0
            ? selectedNote.title
            : 'Untitled'
          : title.length > 0
          ? title
          : 'Untitled'}
      </p>
      <div className={`${ellipsisClassName} ${styles.ellipsis}`}>
        <FaEllipsisH onClick={handleToggleMenu} />
        <Modal
          local
          show={showMenu}
          close={() => setShowMenu(false)}
          modalClassName={styles.menu}
        >
          <NavElementMenu />
        </Modal>
      </div>
    </NavLink>
  );
};

export default NavElement;
