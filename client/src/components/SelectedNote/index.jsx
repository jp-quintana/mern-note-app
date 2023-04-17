import { useState, useRef } from 'react';
import { FaSmile, FaImage } from 'react-icons/fa';
import TextareaAutosize from 'react-textarea-autosize';

import Editor from './Editor';

import Modal from 'components/Modal';
import EmojiPicker from 'components/EmojiPicker';

import styles from './index.module.scss';

const SelectedNote = ({ id, initialTitle, initialEmoji, initialContent }) => {
  const contentRef = useRef(0);

  const [userInput, setUserInput] = useState({
    title: initialTitle || '',
    emoji: initialEmoji || '',
    content: initialContent || '',
  });

  const { title, emoji, content } = userInput;

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (e) => {
    setUserInput((prevState) => ({ ...prevState, emoji: e.native }));
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

  const handleFormChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
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
