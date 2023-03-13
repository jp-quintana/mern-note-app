import { useState } from 'react';
import { FaSmile, FaImage } from 'react-icons/fa';

import styles from './index.module.scss';

const SelectedNote = ({ id, initialTitle, initialEmoji, initialContent }) => {
  const [userInput, setUserInput] = useState({
    title: initialTitle || '',
    emoji: initialEmoji || '',
    content: initialContent || '',
  });
  return (
    <form className={styles.form}>
      <div className={styles.header}>
        <div className={styles.header_content}>
          <ul className={styles.controls}>
            <li>
              <FaSmile /> Add Emoji
            </li>
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
