import { useState, useRef, useCallback, useEffect } from 'react';
import { FaSmile, FaImage } from 'react-icons/fa';

import { useNote } from 'hooks/useNote';
import { useNotesContext } from 'hooks/useNotesContext';

import Editor from './Editor';

import Modal from 'components/Modal';
import EmojiPicker from 'components/EmojiPicker';

import styles from './index.module.scss';

const SelectedNote = ({ initialContent }) => {
  const { editSelectedNote, saveChanges } = useNote();
  const { selectedNote } = useNotesContext();

  const contentRef = useRef();

  const [hasEdited, setHasEdited] = useState(false);

  const [content, setContent] = useState(initialContent);

  const { id, title, emoji } = selectedNote;

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (e) => {
    if (!hasEdited) {
      setHasEdited(true);
    }

    editSelectedNote('emoji', e.native);
    setShowPicker(false);
  };

  const handleKeyDown = (e, name) => {
    if (name === 'title') {
      if (e.key === 'Enter') {
        e.preventDefault(0);
        contentRef.current.focus();
      }
    }
  };

  const handleFormChange = useCallback((e) => {
    if (!hasEdited) {
      setHasEdited(true);
    }

    if (e.target.name === 'content') {
      setContent(e.target.value);
    } else {
      editSelectedNote(e.target.name, e.target.value);
    }
  });

  useEffect(() => {
    if (hasEdited) {
      console.log('running');
      const timer = setTimeout(() => {
        saveChanges(id, content);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [title, emoji, content, hasEdited]);

  return (
    <div className={styles.container}>
      <div className={styles.note}>
        <div className={styles.header}>
          <div
            onClick={() => setShowPicker(true)}
            className={styles.emoji_wrapper}
          >
            <div className={styles.emoji}>{emoji}</div>
          </div>
          <div className={styles.header_content}>
            <Modal
              local
              show={showPicker}
              close={() => setShowPicker(false)}
              modalClassName={styles.picker}
            >
              <EmojiPicker onEmojiSelect={handleEmojiSelect} theme="dark" />
            </Modal>
            <ul className={styles.controls}>
              {!emoji && (
                <li onClick={() => setShowPicker(true)}>
                  <FaSmile /> Add Emoji
                </li>
              )}
              <li>
                <FaImage /> Add Cover
              </li>
            </ul>
            <Editor
              isTitle
              value={title}
              name="title"
              placeholder="Untitled"
              onKeyDown={handleKeyDown}
              onInput={handleFormChange}
              className={styles.title}
            />
          </div>
        </div>
        <div className={styles.body}>
          <Editor
            value={content}
            name="content"
            placeholder="Add note"
            onInput={handleFormChange}
            className={styles.content}
            ref={contentRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedNote;
