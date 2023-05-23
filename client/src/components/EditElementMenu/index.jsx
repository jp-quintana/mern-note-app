import { useCallback, useEffect, useRef } from 'react';

import { useNote } from 'hooks/useNote';

import Editor from '../Editor';

import styles from './index.module.scss';

const EditElementMenu = ({
  id,
  isSelected,
  title,
  emoji,
  isFavorite,
  closeMenu,
}) => {
  const { editSelectedNote, editEditingNote, saveEditingChanges } = useNote();

  const isFirstRender = useRef(true);

  const handleKeyDown = (e, name) => {
    if (name === 'title') {
      if (e.key === 'Enter' || e.key === 'Escape') {
        closeMenu();
      }
    }
  };

  const handleFormChange = useCallback((e) => {
    if (isSelected) {
      editSelectedNote(e.target.name, e.target.value);
    } else {
      editEditingNote(e.target.name, e.target.value);
    }
  });

  useEffect(() => {
    if (!isFavorite) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        if (!isSelected) {
          saveEditingChanges({ id, title, emoji });
        }
      }
    }
  }, [title, emoji]);

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
