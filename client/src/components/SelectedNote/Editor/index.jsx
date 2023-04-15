import TextareaAutosize from 'react-textarea-autosize';

const Editor = ({ isTitle, name, placeholder, onInput, className }) => {
  return (
    <TextareaAutosize
      name={name}
      placeholder={placeholder}
      onInput={onInput}
      className={className}
    />
  );
};

export default Editor;
