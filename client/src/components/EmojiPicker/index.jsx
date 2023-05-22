import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ onEmojiSelect, theme }) => {
  return <Picker data={data} theme={theme} onEmojiSelect={onEmojiSelect} />;
};

export default EmojiPicker;
