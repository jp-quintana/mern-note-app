import { useRef, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { useNoteContext } from 'hooks/useNoteContext';

import Header from './Header';

import styles from './index.module.scss';

const Main = () => {
  const isFirstRender = useRef(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { notes, selectedNote } = useNoteContext();

  // TODO: polish this
  useEffect(() => {
    if (pathname === '/') {
      if (notes.length > 0) {
        navigate(`/notes/${notes[0].id}`);
      } else {
        navigate(`/notes/getting-started`);
      }
    } else if (!isFirstRender && !selectedNote) {
      if (notes.length > 0) {
        navigate(`/notes/${notes[0].id}`);
      } else {
        navigate(`/notes/getting-started`);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [selectedNote, pathname]);

  return (
    <div className={styles.container}>
      <Header selectedNote={selectedNote} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
