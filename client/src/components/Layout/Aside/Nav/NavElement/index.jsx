import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaEllipsisH } from 'react-icons/fa';

import { useNotesContext } from 'hooks/useNotesContext';

import NavElementMenu from './NavElementMenu';

import Modal from 'components/Modal';

import styles from './index.module.scss';

const NavElement = ({
  id,
  to,
  emoji,
  title,
  isFavorite,
  ellipsisClassName,
}) => {
  const { selectedNote } = useNotesContext();
  const [modalPosition, setModalPosition] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    const targetRect = e.target.getBoundingClientRect();
    const isAboveMidpoint =
      targetRect.top + targetRect.height / 2 < window.innerHeight / 2;
    const modalHeight = 200;
    const modalTop = isAboveMidpoint
      ? targetRect.bottom
      : targetRect.top - modalHeight;
    const modalLeft = targetRect.right;
    setModalPosition({ top: modalTop, left: modalLeft });
    setShowMenu(true);
  };

  return (
    <NavLink className={styles.link} to={to}>
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
      <div
        onClick={handleToggleMenu}
        className={`${ellipsisClassName} ${styles.ellipsis}`}
      >
        <FaEllipsisH />
      </div>
      <Modal
        show={showMenu}
        close={() => setShowMenu(false)}
        modalPosition={modalPosition}
        modalContainerClassName={styles.menu_container}
        modalClassName={styles.menu}
      >
        <NavElementMenu id={id} isFavorite={isFavorite} />
      </Modal>
    </NavLink>
  );
};

export default NavElement;
