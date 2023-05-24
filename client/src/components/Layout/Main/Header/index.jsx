import { useState } from 'react';

import {
  FaRegCommentAlt,
  FaRegClock,
  FaRegStar,
  FaStar,
  FaEllipsisH,
} from 'react-icons/fa';

import moment from 'moment';

import { useNote } from 'hooks/useNote';

import Modal from 'components/Modal';
import EditElementMenu from 'components/EditElementMenu';

import formatDate from 'utils/formatDate';

import styles from './index.module.scss';

const Header = ({ selectedNote }) => {
  const { favoriteNote, unfavoriteNote } = useNote();

  const [editMenuPosition, setEditMenuPosition] = useState(null);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const handleToggleFavorite = async () => {
    if (selectedNote.isFavorite) {
      await unfavoriteNote(selectedNote.id);
    } else {
      await favoriteNote(selectedNote.id);
    }
  };

  const handleOpenEditModal = (e) => {
    e.preventDefault();
    const elementRect = e.currentTarget.getBoundingClientRect();
    const modalTop = elementRect.bottom + 4;
    const modalLeft = elementRect.left / 1.3;
    setEditMenuPosition({ top: modalTop, left: modalLeft });
    setShowEditMenu(true);
  };

  return (
    <>
      {selectedNote && (
        <Modal
          show={showEditMenu}
          close={() => setShowEditMenu(false)}
          modalPosition={editMenuPosition}
          modalContainerClassName={styles.menu_container}
          modalClassName={styles.menu}
        >
          <EditElementMenu
            isSelected
            title={selectedNote.title}
            emoji={selectedNote.emoji ? selectedNote.emoji : `\u{1F5CB}`}
            closeMenu={() => setShowEditMenu(false)}
          />
        </Modal>
      )}
      <header className={styles.header}>
        {selectedNote && (
          <div onClick={handleOpenEditModal} className={styles.title_wrapper}>
            <>
              <div className={styles.emoji}>
                {selectedNote.emoji || `\u{1F5CB}`}
              </div>
              <p className={styles.title}>
                {selectedNote.title.length > 0
                  ? selectedNote.title
                  : 'Untitled'}
              </p>
            </>
          </div>
        )}
        <div className={styles.controls_wrapper}>
          <p className={styles.last_edit}>
            {selectedNote &&
              selectedNote.updatedAt &&
              formatDate(moment(selectedNote.updatedAt))}
          </p>
          <p className={styles.share}>Share</p>
          <div className={styles.icon_wrapper}>
            <FaRegCommentAlt />
          </div>
          <div className={styles.icon_wrapper}>
            <FaRegClock />
          </div>
          <div onClick={handleToggleFavorite} className={styles.icon_wrapper}>
            {!selectedNote && <FaRegStar />}
            {selectedNote && (
              <>
                {!selectedNote.isFavorite && <FaRegStar />}
                {selectedNote.isFavorite && <FaStar />}
              </>
            )}
          </div>
          <div className={styles.icon_wrapper}>
            <FaEllipsisH />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
