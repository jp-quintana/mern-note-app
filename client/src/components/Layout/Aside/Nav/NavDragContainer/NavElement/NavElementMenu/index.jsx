import { FaTrashAlt, FaRegClone, FaLink, FaEdit } from 'react-icons/fa';
import { TbStar, TbStarOff, TbArrowForwardUp } from 'react-icons/tb';

import { useNote } from 'hooks/useNote';

import styles from './index.module.scss';

const NavElementMenu = ({ id, isFavorite, closeMenu, openEditModal }) => {
  const { favoriteNote, unfavoriteNote, duplicateNote, deleteNote } = useNote();

  const handleDeleteNote = async () => {
    await deleteNote(id);
  };

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await unfavoriteNote(id);
    } else {
      await favoriteNote(id);
    }
    closeMenu();
  };

  const handleDuplicateNote = async () => {
    await duplicateNote(id);
    closeMenu();
  };

  const handleEdit = async (e) => {
    openEditModal(e);
    closeMenu();
  };

  // TODO: Fix this for production
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://127.0.0.1:5173/notes/${id}`);
    closeMenu();
  };

  // TODO: Complete last edited, rename, move to and handleCopyLink

  return (
    <div className={styles.container}>
      <div className={styles.list_wrapper}>
        <ul className={styles.list}>
          <li onClick={() => handleDeleteNote(id)} className={styles.list_item}>
            <FaTrashAlt size={`1.6rem`} />
            <p>Delete</p>
          </li>
          <li className={styles.list_item} onClick={handleToggleFavorite}>
            {!isFavorite && (
              <>
                <TbStar size={`1.6rem`} />
                <p>Add to Favorites</p>
              </>
            )}
            {isFavorite && (
              <>
                <TbStarOff size={`1.6rem`} />
                <p>Remove from Favorites</p>
              </>
            )}
          </li>
          <li className={styles.list_item} onClick={handleDuplicateNote}>
            <FaRegClone size={`1.6rem`} />
            <p>Duplicate</p>
          </li>
          <li onClick={handleCopyLink} className={styles.list_item}>
            <FaLink size={`1.6rem`} />
            <p>Copy Link</p>
          </li>
          <li className={styles.list_item} onClick={handleEdit}>
            <FaEdit size={`1.6rem`} />
            <p>Rename</p>
          </li>
        </ul>
      </div>
      <div className={styles.move_to_wrapper}>
        <div className={styles.move_to} onClick={closeMenu}>
          <TbArrowForwardUp size={`1.6rem`} />
          <p>Move to</p>
        </div>
      </div>
      <div className={styles.last_edit_wrapper}>
        <p className={styles.last_edit}>Last edited...</p>
      </div>
    </div>
  );
};

export default NavElementMenu;
