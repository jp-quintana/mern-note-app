import { Outlet } from 'react-router-dom';
import {
  FaRegCommentAlt,
  FaRegClock,
  FaRegStar,
  FaStar,
  FaEllipsisH,
} from 'react-icons/fa';

import { useNotesContext } from 'hooks/useNotesContext';
import { useNote } from 'hooks/useNote';

import styles from './index.module.scss';

const Main = () => {
  const { selectedNote } = useNotesContext();
  const { toggleFavoriteNote } = useNote();

  // TODO: Add last edit date

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title_wrapper}>
          <div className={styles.emoji}>
            {selectedNote && (selectedNote.emoji || `\u{1F5CB}`)}
          </div>
          <p className={styles.title}>{selectedNote && selectedNote.title}</p>
        </div>
        <div className={styles.controls_wrapper}>
          <p className={styles.last_edit}>{selectedNote && 'Edited 2d ago'}</p>
          <p className={styles.share}>Share</p>
          <div className={styles.icon_wrapper}>
            <FaRegCommentAlt />
          </div>
          <div className={styles.icon_wrapper}>
            <FaRegClock />
          </div>
          <div onClick={toggleFavoriteNote} className={styles.icon_wrapper}>
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
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
