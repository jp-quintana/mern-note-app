import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { useNotesContext } from 'hooks/useNotesContext';

import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Note from './pages/Note';

import './App.scss';

function App() {
  const { notesAreReady } = useNotesContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* </Route> */}

        <Route element={<ProtectedRoutes needAuth />}>
          <Route path="/" element={notesAreReady && <Layout />}>
            <Route path="/notes/:noteId" element={<Note />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
