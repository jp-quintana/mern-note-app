import { useState } from 'react';
import { FaSmile, FaImage } from 'react-icons/fa';

import Modal from 'components/Modal';
import EmojiPicker from 'components/EmojiPicker';

import styles from './index.module.scss';

const SelectedNote = ({ id, initialTitle, initialEmoji, initialContent }) => {
  const [userInput, setUserInput] = useState({
    title: initialTitle || '',
    emoji: initialEmoji || '',
    content: initialContent || '',
  });

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (e) => {
    setUserInput((prevState) => ({ ...prevState, emoji: e.native }));
    setShowPicker(false);
  };

  return (
    <form className={styles.form}>
      <div className={styles.header}>
        <div
          onClick={() => setShowPicker(true)}
          className={styles.emoji_wrapper}
        >
          <div className={styles.emoji}>{userInput.emoji}</div>
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
            {!userInput.emoji && (
              <li onClick={() => setShowPicker(true)}>
                <FaSmile /> Add Emoji
              </li>
            )}
            <li>
              <FaImage /> Add Cover
            </li>
          </ul>
          <input
            value={userInput.title}
            onChange={(e) =>
              setUserInput((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            placeholder="Untitled"
            className={styles.title}
          />
        </div>
      </div>
      <div className={styles.body}>
        <textarea
          name="content"
          className={styles.content}
          placeholder="Enter notes"
        />
      </div>
    </form>
  );
};

export default SelectedNote;
