import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';

import './App.scss';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
