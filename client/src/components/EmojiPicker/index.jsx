import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ onEmojiSelect, className }) => {
  return <Picker data={data} onEmojiSelect={onEmojiSelect} />;
};

export default EmojiPicker;
