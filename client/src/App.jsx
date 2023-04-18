import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import NotesProvider from './context/notes/NotesProvider';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Note from './pages/Note';

import './App.scss';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/notes/:noteId" element={<Note />} />
          <Route path="/login" element={<Home />} />
        </Route>
      </>
    )
  );

  return (
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  );
}

export default App;
