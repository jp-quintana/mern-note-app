import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight, FaPlus } from 'react-icons/fa';

import { useNoteContext } from 'hooks/useNoteContext';
import { useNote } from 'hooks/useNote';

import NavElement from './NavElement';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Nav = () => {
  const navigate = useNavigate();

  const { notes, selectedNote } = useNoteContext();
  const { createNote } = useNote();

  const favoriteNotes = notes.filter((note) => note.isFavorite);

  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [needToNavigate, setNeedToNavigate] = useState(false);

  const handleAddNote = (e) => {
    createNote();
    setShowNotes(true);
    setNeedToNavigate(true);
  };

  useEffect(() => {
    if (needToNavigate) {
      navigate(`/notes/${notes[0].id}`);
      setNeedToNavigate(false);
    }
  }, [needToNavigate]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
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
            {showFavorites &&
              favoriteNotes.map((note) => (
                <li
                  className={
                    selectedNote && selectedNote.id === note.id
                      ? styles.isSelected
                      : undefined
                  }
                  key={note.id}
                >
                  <NavElement
                    id={note.id}
                    to={`/notes/${note.id}`}
                    emoji={note.emoji}
                    title={note.title}
                    isFavorite={note.isFavorite}
                    ellipsisClassName={styles.ellipsis}
                  />
                </li>
              ))}
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
            {showNotes &&
              notes.map((note) => (
                <li
                  className={
                    selectedNote && selectedNote.id === note.id
                      ? styles.isSelected
                      : undefined
                  }
                  key={note.id}
                >
                  <NavElement
                    id={note.id}
                    to={`/notes/${note.id}`}
                    emoji={note.emoji}
                    title={note.title}
                    isFavorite={note.isFavorite}
                    ellipsisClassName={styles.ellipsis}
                  />
                </li>
              ))}
          </ul>
        )}
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
      </nav>
    </div>
  );
};

export default Nav;
