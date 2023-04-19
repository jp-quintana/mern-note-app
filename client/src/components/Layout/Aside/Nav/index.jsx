import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

import { useNotesContext } from 'hooks/useNotesContext';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Nav = () => {
  const { notes: fetchedNotes } = useNotesContext();

  const notes = fetchedNotes.filter((note) => !note.isFavorite);
  const favoriteNotes = fetchedNotes.filter((note) => note.isFavorite);

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
                  showFavorites ? styles.icon_open : ''
                }`}
              >
                <FaAngleRight />
              </div>
              <p>Favorite Notes:</p>
            </div>
            {showFavorites &&
              favoriteNotes.map((note) => (
                <li key={note.id}>
                  <NavLink to={`/notes/${note.id}`}>
                    <div className={styles.emoji}>
                      {note.emoji || `\u{1F5CB}`}
                    </div>
                    {note.title}
                  </NavLink>
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
                showNotes ? styles.icon_open : ''
              }`}
            >
              <FaAngleRight />
            </div>
            <p>Notes:</p>
          </div>
          {showNotes &&
            notes.map((note) => (
              <li key={note.id}>
                <NavLink to={`/notes/${note.id}`}>
                  <div className={styles.emoji}>
                    {note.emoji || `\u{1F5CB}`}
                  </div>
                  {note.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
