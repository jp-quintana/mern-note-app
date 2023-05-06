import { useEffect } from 'react';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useAuthContext } from 'hooks/useAuthContext';
import { useNoteContext } from 'hooks/useNoteContext';

import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Note from './pages/Note';
import Home from './pages/Home';

import './App.scss';

function App() {
  const { loadUser } = useAuth();
  const { authIsReady } = useAuthContext();
  const { notesAreReady } = useNoteContext();

  useEffect(() => {
    (async () => {
      await loadUser();
    })();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoutes needAuth />}>
          <Route path="/" element={notesAreReady && <Layout />}>
            <Route path="/notes/getting-started" element={<Home />} />
            <Route path="/notes/:noteId" element={<Note />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );

  return <>{authIsReady && <RouterProvider router={router} />}</>;
}

export default App;
