import { useRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

const Editor = ({ isTitle, name, placeholder, onInput, className }) => {
  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter' && e.key !== 'Tab') {
      e.preventDefault();
      e.key === 'Tab';
      e.target.dispatchEvent(new KeyboardEvent('keydown', e));
    }
  };

  return (
    <TextareaAutosize
      name={name}
      onKeyDown={isTitle && handleTitleKeyDown}
      placeholder={placeholder}
      onInput={onInput}
      className={className}
    />
  );
};

export default Editor;
