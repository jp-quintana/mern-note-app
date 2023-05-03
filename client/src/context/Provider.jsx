import AuthProvider from './auth/AuthProvider';
import NotesProvider from './notes/NotesProvider';

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <NotesProvider>{children}</NotesProvider>
    </AuthProvider>
  );
};

export default Provider;
