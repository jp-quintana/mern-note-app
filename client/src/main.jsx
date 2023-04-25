import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import NotesProvider from './context/notes/NotesProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
