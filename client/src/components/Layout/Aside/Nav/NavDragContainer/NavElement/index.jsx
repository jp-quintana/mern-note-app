import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { FaEllipsisH } from 'react-icons/fa';

import { useNoteContext } from 'hooks/useNoteContext';

import NavElementMenu from './NavElementMenu';
import EditElementMenu from '../../../../../EditElementMenu';

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
  const emojiRef = useRef(null);

  const { selectedNote } = useNoteContext();
  const [navMenuPosition, setNavMenuPosition] = useState(null);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const [editMenuPosition, setEditMenuPosition] = useState(null);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const handleOpenNavMenu = (e) => {
    e.preventDefault();
    const targetRect = e.target.getBoundingClientRect();
    const isAboveMidpoint =
      targetRect.top + targetRect.height / 2 < window.innerHeight / 2;
    const modalHeight = 200;
    const modalTop = isAboveMidpoint
      ? targetRect.bottom
      : targetRect.top - modalHeight;
    const modalLeft = targetRect.right;
    setNavMenuPosition({ top: modalTop, left: modalLeft });
    setShowNavMenu(true);
  };

  const handleToggleEditModal = (e) => {
    e.preventDefault();
    const emojiRect = emojiRef.current.getBoundingClientRect();
    const modalTop = emojiRect.bottom;
    const modalLeft = emojiRect.left;
    setEditMenuPosition({ top: modalTop, left: modalLeft });
    setShowEditMenu(true);
  };

  const currentEmoji =
    selectedNote && id === selectedNote.id
      ? selectedNote.emoji || `\u{1F5CB}`
      : emoji || `\u{1F5CB}`;

  const currentTitle =
    selectedNote && id === selectedNote.id
      ? selectedNote.title.length > 0
        ? selectedNote.title
        : 'Untitled'
      : title.length > 0
      ? title
      : 'Untitled';

  return (
    <NavLink className={styles.link} to={to}>
      <div ref={emojiRef} className={styles.emoji}>
        {currentEmoji}
      </div>
      <p>{currentTitle}</p>
      <div
        onClick={handleOpenNavMenu}
        className={`${ellipsisClassName} ${styles.ellipsis}`}
      >
        <FaEllipsisH />
      </div>
      <Modal
        show={showNavMenu}
        close={() => setShowNavMenu(false)}
        modalPosition={navMenuPosition}
        modalContainerClassName={styles.menu_container}
        modalClassName={styles.menu}
      >
        <NavElementMenu
          id={id}
          isFavorite={isFavorite}
          closeMenu={() => setShowNavMenu(false)}
          openEditModal={handleToggleEditModal}
        />
      </Modal>
      <Modal
        show={showEditMenu}
        close={() => setShowEditMenu(false)}
        modalPosition={editMenuPosition}
        modalContainerClassName={styles.menu_container}
        modalClassName={styles.menu}
      >
        <EditElementMenu
          // id={id}
          // isFavorite={isFavorite}
          title={currentTitle}
          emoji={currentEmoji}
          closeMenu={() => setShowEditMenu(false)}
        />
      </Modal>
    </NavLink>
  );
};

export default NavElement;
