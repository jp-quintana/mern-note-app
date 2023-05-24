import { forwardRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

const Editor = forwardRef(
  (
    { isTitle, rows, value, name, placeholder, onInput, onKeyDown, className },
    ref
  ) => {
    return (
      <TextareaAutosize
        rows={rows}
        value={value}
        name={name}
        placeholder={placeholder}
        onKeyDown={isTitle && ((e) => onKeyDown(e, name))}
        onInput={onInput}
        ref={ref}
        className={className}
      />
    );
  }
);

export default Editor;
