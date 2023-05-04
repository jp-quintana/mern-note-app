import AuthProvider from './auth/AuthProvider';
import NoteProvider from './note/NoteProvider';

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <NoteProvider>{children}</NoteProvider>
    </AuthProvider>
  );
};

export default Provider;
