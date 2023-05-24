import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { FaEllipsisH } from 'react-icons/fa';

import { useNoteContext } from 'hooks/useNoteContext';
import { useNote } from 'hooks/useNote';

import NavElementMenu from './NavElementMenu';
import EditElementMenu from 'components/EditElementMenu';
import EmojiPicker from 'components/EmojiPicker';

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

  const { selectedNote, editingValue } = useNoteContext();
  const { setEditingValue, editSelectedNote, updateEmojiFromNav } = useNote();

  const [pickerPosition, setPickerPosition] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [navMenuPosition, setNavMenuPosition] = useState(null);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const [editMenuPosition, setEditMenuPosition] = useState(null);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const handleOpenNavMenu = (e) => {
    e.preventDefault();
    const targetRect = e.target.getBoundingClientRect();
    const modalHeight = 227;
    const isAboveMidpoint =
      targetRect.top + targetRect.height / 2 < window.innerHeight / 2;
    const modalLeft = targetRect.right;
    const navMenuPosition = isAboveMidpoint
      ? { top: targetRect.bottom, left: modalLeft }
      : { top: targetRect.top - modalHeight, left: modalLeft };
    setNavMenuPosition(navMenuPosition);
    setShowNavMenu(true);
  };

  const handleOpenEditModal = (e) => {
    e.preventDefault();
    setEditingValue({ id, title, emoji });
    const emojiRect = emojiRef.current.getBoundingClientRect();
    const modalTop = emojiRect.bottom;
    const modalLeft = emojiRect.left;
    setEditMenuPosition({ top: modalTop, left: modalLeft });
    setShowEditMenu(true);
  };

  const handleCloseEditModal = () => {
    setShowEditMenu(false);
    setEditingValue(null);
  };

  const isSelectedElement = selectedNote && selectedNote.id === id;

  const isEditingElement =
    !isSelectedElement && editingValue && editingValue.id === id;

  const currentEmoji = isEditingElement
    ? editingValue.emoji
    : isSelectedElement
    ? selectedNote.emoji
    : emoji;

  const currentTitle = isEditingElement
    ? editingValue.title
    : isSelectedElement
    ? selectedNote.title
    : title;

  const handleOpenPicker = (e) => {
    e.preventDefault();
    const emojiRect = e.target.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - emojiRect.bottom;
    const modalHeight = 435;
    let pickerPosition;
    if (distanceFromBottom < modalHeight) {
      const topPosition = window.innerHeight - modalHeight - 10;
      pickerPosition = { top: topPosition, left: emojiRect.right + 5 };
    } else {
      pickerPosition = { top: emojiRect.bottom + 3, left: emojiRect.left };
    }
    setPickerPosition(pickerPosition);
    setShowPicker(true);
  };

  const handleEmojiSelect = (e) => {
    if (isSelectedElement) {
      editSelectedNote('emoji', e.native);
    } else {
      updateEmojiFromNav(id, e.native);
    }
    setShowPicker(false);
  };

  return (
    <>
      <Modal
        show={showPicker}
        close={() => setShowPicker(false)}
        modalPosition={pickerPosition}
        modalContainerClassName={styles.picker_container}
        modalClassName={styles.picker}
      >
        <EmojiPicker onEmojiSelect={handleEmojiSelect} theme="dark" />
      </Modal>
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
          openEditModal={handleOpenEditModal}
        />
      </Modal>
      <Modal
        show={showEditMenu}
        close={handleCloseEditModal}
        modalPosition={editMenuPosition}
        modalContainerClassName={styles.menu_container}
        modalClassName={styles.menu}
      >
        <EditElementMenu
          id={id}
          isSelected={isSelectedElement}
          title={currentTitle}
          emoji={currentEmoji ? currentEmoji : `\u{1F5CB}`}
          isFavorite={isFavorite}
          closeMenu={handleCloseEditModal}
        />
      </Modal>
      <NavLink className={styles.link} to={to}>
        <div onClick={handleOpenPicker} ref={emojiRef} className={styles.emoji}>
          {currentEmoji === '' ? `\u{1F5CB}` : currentEmoji}
        </div>
        <p>{currentTitle.length > 0 ? currentTitle : 'Untitled'}</p>
        <div
          onClick={handleOpenNavMenu}
          className={`${ellipsisClassName} ${styles.ellipsis}`}
        >
          <FaEllipsisH />
        </div>
      </NavLink>
    </>
  );
};

export default NavElement;
