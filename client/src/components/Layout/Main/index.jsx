import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  FaRegCommentAlt,
  FaRegClock,
  FaRegStar,
  FaStar,
  FaEllipsisH,
} from 'react-icons/fa';

import moment from 'moment';

import { useNoteContext } from 'hooks/useNoteContext';
import { useNote } from 'hooks/useNote';

import formatDate from 'utils/formatDate';

import styles from './index.module.scss';

const Main = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { notes, selectedNote } = useNoteContext();
  const { favoriteNote, unfavoriteNote } = useNote();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleToggleFavorite = async () => {
    if (selectedNote.isFavorite) {
      await unfavoriteNote(selectedNote.id);
    } else {
      await favoriteNote(selectedNote.id);
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      if (notes.length > 0) {
        navigate(`/notes/${notes[0].id}`);
      } else {
        navigate(`/notes/getting-started`);
      }
    } else if (!isFirstLoad && !selectedNote) {
      if (notes.length > 0) {
        navigate(`/notes/${notes[0].id}`);
      } else {
        navigate(`/notes/getting-started`);
      }
    }

    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [selectedNote, pathname]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {selectedNote && (
          <div className={styles.title_wrapper}>
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
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
