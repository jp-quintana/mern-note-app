import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

import { useNotesContext } from 'hooks/useNotesContext';

import NavElement from './NavElement';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Nav = () => {
  const { notes, selectedNote } = useNotesContext();

  const favoriteNotes = notes.filter((note) => note.isFavorite);

  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

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
                    selectedNote.id === note.id ? styles.isSelected : undefined
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
                  selectedNote.id === note.id ? styles.isSelected : undefined
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
      </nav>
    </div>
  );
};

export default Nav;
