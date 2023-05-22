import { useCallback, useEffect, useRef } from 'react';

import Editor from '../Editor';

import styles from './index.module.scss';

const EditElementMenu = ({ title, emoji, closeMenu }) => {
  const isFirstRender = useRef(true);

  const handleKeyDown = (e, name) => {
    if (name === 'title') {
      if (e.key === 'Enter' || e.key === 'Escape') {
        closeMenu();
      }
    }
  };

  const handleFormChange = useCallback((e) => {
    if (!hasEdited) {
      setHasEdited(true);
    }

    editSelectedNote(e.target.name, e.target.value);
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.emoji_wrapper}>{emoji}</div>
      <div className={styles.input_wrapper}>
        <Editor
          isTitle
          name="title"
          value={title}
          onKeyDown={handleKeyDown}
          rows={1}
          className={styles.input}
          type="text"
          onInput={handleFormChange}
        />
      </div>
    </div>
  );
};

export default EditElementMenu;
