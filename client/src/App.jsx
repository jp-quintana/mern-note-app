import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { useNotesContext } from 'hooks/useNotesContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Note from './pages/Note';

import './App.scss';

function App() {
  const { notesAreReady } = useNotesContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={notesAreReady && <Home />} />
          <Route path="/notes/:noteId" element={<Note />} />
          <Route path="/login" element={<Home />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
