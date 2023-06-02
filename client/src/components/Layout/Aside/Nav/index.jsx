import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight, FaPlus } from 'react-icons/fa';

import { useNoteContext } from 'hooks/useNoteContext';
import { useNote } from 'hooks/useNote';

import NavDragContainer from './NavDragContainer';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Nav = () => {
  const navigate = useNavigate();

  const { notes, favoriteNotes, selectedNote } = useNoteContext();
  const { createNote } = useNote();

  // const favoriteNotes = notes.filter((note) => note.isFavorite);

  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [needToNavigate, setNeedToNavigate] = useState(false);

  const handleAddNote = async (e) => {
    await createNote();
    setShowNotes(true);
    setNeedToNavigate(true);
  };

  useEffect(() => {
    if (needToNavigate && notes.length > 0) {
      navigate(`/notes/${notes[0].id}`);
      setNeedToNavigate(false);
    }
  }, [needToNavigate]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {notes.length === 0 && (
          <div className={styles.list}>
            <div onClick={handleAddNote} className={styles.list_header}>
              <div
                className={`${styles.icon_wrapper} ${
                  showFavorites ? styles.icon_open : undefined
                }`}
              >
                <FaPlus size={'1.3rem'} />
              </div>
              <p>Add Note</p>
            </div>
          </div>
        )}
        {favoriteNotes.length > 0 && (
          <ul className={styles.list}>
            <div
              onClick={() => setShowFavorites((prevState) => !prevState)}
              className={styles.list_header}
            >
              <div
                className={`${styles.icon_wrapper} ${
                  showFavorites ? styles.icon_open : undefined
                }`}
              >
                <FaAngleRight />
              </div>
              <p>Favorite Notes:</p>
            </div>
            {showFavorites && (
              <NavDragContainer
                containerType="favorite"
                notes={favoriteNotes}
                selectedNote={selectedNote}
              />
            )}
          </ul>
        )}

        {notes.length > 0 && (
          <ul className={styles.list}>
            <div
              onClick={() => setShowNotes((prevState) => !prevState)}
              className={styles.list_header}
            >
              <div
                className={`${styles.icon_wrapper} ${
                  showNotes ? styles.icon_open : undefined
                }`}
              >
                <FaAngleRight />
              </div>
              <p>Notes:</p>
            </div>
            {showNotes && (
              <NavDragContainer
                containerType="normal"
                notes={notes}
                selectedNote={selectedNote}
              />
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
